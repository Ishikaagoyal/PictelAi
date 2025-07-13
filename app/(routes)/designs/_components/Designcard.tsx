import { Button } from '@/components/ui/button'
import Constants from '@/data/Constants'
import { Code } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Designcard({ item }: any) {
  const modelObj = item && Constants.AiModelList.find((x) => x.name == item?.model)

  return (
    <div className="p-5 border rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
      <Image
        src={item?.imageurl}
        alt="image"
        width={300}
        height={200}
        className="object-cover w-full h-[200px] rounded-lg bg-white"
      />
      <div className="mt-3 space-y-2">
        <h2 className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{item?.description}</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-full">
            {modelObj && (
              <Image src={modelObj?.icon} alt={modelObj?.modelname ?? ''} width={30} height={30} />
            )}
            <h2 className="text-sm">{modelObj?.name}</h2>
          </div>
          <Link href={'/view-code/' + item?.uid}>
            <Button className="dark:text-white text-sm gap-1">
              <Code className="w-4 h-4" />
              view code
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Designcard
