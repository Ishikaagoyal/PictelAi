'use client'

import React from 'react'
import { RECORD } from '../[uid]/page'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'

function SelectionDetails({ record, regenrateCode, isready }: any) {
  return record && (
    <div className="p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <h2 className="font-bold my-2">Wireframe:</h2>
      <Image
        src={record?.imageurl}
        alt="wireframe"
        width={300}
        height={400}
        className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
      />
      <h2 className="mt-4 font-bold mb-2">AI Model</h2>
      <Input defaultValue={record?.model} disabled className="bg-white dark:bg-gray-800" />
      <h2 className="mt-4 font-bold mb-2">Description</h2>
      <Textarea
        defaultValue={record?.description}
        disabled
        className="bg-white dark:bg-gray-800 h-[180px]"
      />
      <Button className="mt-7 w-full" disabled={!isready} onClick={regenrateCode}>
        <RefreshCcw className="mr-2" />
        Regenerate Code
      </Button>
    </div>
  )
}

export default SelectionDetails
