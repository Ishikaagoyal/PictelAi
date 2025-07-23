
'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload, Loader2Icon, Wand, X } from 'lucide-react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

import React, { ChangeEvent, useState } from 'react'
//import ref from 'firebase/storage'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { storage } from '@/configs/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import { useRouter } from 'next/navigation'
import Constants from '@/data/Constants'
import { toast } from 'sonner'

export default function ImageUpload() {
    

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [model, setmodel]= useState<string>();
    const [description, setdescription]= useState<string>()
    const {user}= useAuthContext();
    const router= useRouter();
    const [loading, setloading] = useState(false);

const [file, setfile]=useState<any>();
    const onImageselect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const imageurl = URL.createObjectURL(files[0])
            setfile(files[0])
            setPreviewUrl(imageurl)
        }
    }
    const OnconvertTocode=async()=>{
        if(!file || !model || !description){
            console.log("select all fields");
            return ;
        }
        setloading(true);
        //save image to firebase
        const filename=Date.now()+'.png';
        const imageref= ref(storage, 'wireframe to code/'+filename);
        await uploadBytes(imageref,file).then(resp=>{
            console.log('image uploaded')
        })
        const imageurl= await getDownloadURL(imageref)
        //console.log(imageurl)
        const uid=uuidv4()
        //save info to db
        const result= await axios.post('/api/wireframe-to-code',{
            uid:uid,
            description:description,
            imageurl:imageurl,
            model: model,
            email:user?.email
        })
        if(result.data?.error){
            console.log('not enough credits');
            toast('Not Enough Credits!');
            setloading(false);
            return;
        }
        //console.log(result.data)
        setloading(false);
        router.push('/view-code/'+ uid);


    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn">
            {!previewUrl ? (
                <div className="p-7 border-2 border-dashed rounded-xl shadow-lg flex flex-col items-center transition hover:shadow-xl bg-muted/10">
                    <CloudUpload className="h-10 w-10 text-primary animate-pulse" />
                    <h2 className="font-bold text-lg mt-2 dark:text-gray-100">Upload Image</h2>
                    <p className="text-muted-foreground mt-2">Click Button to Select Wireframe Image</p>
                    <div className="p-5 border border-dashed w-full mt-7 flex justify-center rounded-md">
                        <label htmlFor="imageSelect">
                            <span className="p-2 bg-blue-100 text-md text-primary rounded-md px-5 hover:bg-blue-200 transition cursor-pointer">
                                Select Image
                            </span>
                        </label>
                    </div>
                    <input type="file" id="imageSelect" className="hidden" onChange={onImageselect} />
                </div>
            ) : (
                <div className="relative p-5 border border-muted rounded-xl cursor-pointer shadow-md">
                    <Image
                        src={previewUrl}
                        alt="preview"
                        width={500}
                        height={300}
                        className="w-full h-[300px] object-contain rounded-md"
                    />
                    <X className="absolute top-3 right-3 cursor-pointer hover:text-red-500" onClick={() => setPreviewUrl(null)} />
                </div>
            )}

            <div className="p-7 border shadow-md rounded-xl bg-background/50 backdrop-blur">
                <h2 className="font-bold text-lg dark:text-gray-100">Select AI Model</h2>
                <Select onValueChange={((value)=>setmodel(value))}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select AI Model" />
                    </SelectTrigger>
                    <SelectContent>
                        {Constants?.AiModelList.map((model, index) => (
                            <SelectItem value={model.name} key={index}>
                                <div className="flex items-center gap-2">
                                    <Image src={model.icon} alt={model.name} width={25} height={25} />
                                    <span>{model.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <h2 className="font-bold text-lg mt-7 dark:text-gray-100">Enter Description about your Webpage</h2>
                <Textarea className="mt-3 h-[200px]" placeholder="Write about your webpage" 
                onChange={(event)=>setdescription(event?.target.value)}/>
            </div>

            <div className="col-span-full mt-10 flex justify-center">
                <Button className="gap-2 hover:scale-105 transition-transform duration-300 dark:text-white "
                onClick={OnconvertTocode} disabled={loading}>
                    {loading?<Loader2Icon className='animate-spin'/>:<Wand />}
                    Convert to Code
                </Button>
            </div>
        </div>
    )
}
//copyrights @ishikagoyal