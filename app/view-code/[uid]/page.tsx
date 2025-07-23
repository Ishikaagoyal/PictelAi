'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectionDetails from '../_components/selectionDetails'
import CodeEditor from '../_components/codeEditor'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Constants from '@/data/Constants'
import AppHeader from '@/app/_components/AppHeader'

export interface RECORD {
  id: number
  description: string
  code: any
  imageurl: string
  model: string
  createdby: string
  uid: string
}

export default function ViewCode() {
  const { uid } = useParams()
  const [loading, setLoading] = useState(false)
  const [coderesp, setCoderesp] = useState('')
  const [record, setRecord] = useState<RECORD | null>()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (uid) GetRecordInfo()
  }, [uid])

  const GetRecordInfo = async () => {
    setLoading(true)
    setCoderesp('')
    setIsReady(false)

    const result = await axios.get(`/api/wireframe-to-code?uid=${uid}`)
    const resp = result?.data
    setRecord(resp)

    if (resp?.code == null) {
      GenerateCode(resp)
    } else {
      setCoderesp(resp?.code.resp)
      setLoading(false)
      setIsReady(true)
    }
  }

  const GenerateCode = async (record: RECORD) => {
    setLoading(true)

    const res = await fetch('/api/ai-model', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        description: record?.description + ':' + Constants.PROMPT,
        model: record?.model,
        imageurl: record?.imageurl,
      }),
    })

    if (!res.body) {
      console.error('Error in response:', res.status, res.statusText)
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let fullText = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullText += decoder.decode(value)
    }

    const cleaned = fullText
  .replace(/```[a-z]*\n?/gi, '')
  .replace(/```/g, '')
  .replace(/<[^>]*<\/?script>/gi, '')
  .replace(/^import .*;$/gim, (match, index, fullString) => {
    // Keep only the first import, remove the rest
    const firstImportIndex = fullString.indexOf(match)
    return index === firstImportIndex ? match : ''
  })
  .trim()

    setCoderesp(cleaned)
    setIsReady(true)
    updateDB()
    setLoading(false)
  }

  useEffect(() => {
    if (coderesp !== '' && record?.uid && isReady && record?.code == null) {
      updateDB()
    }
  }, [coderesp, record, isReady])

  const updateDB = async () => {
    await axios.put('/api/wireframe-to-code', {
      uid: record?.uid,
      coderesp: { resp: coderesp },
    })
  }

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div>
          <SelectionDetails record={record} regenrateCode={GetRecordInfo} isready={isReady} />
        </div>
        <div className="col-span-4">
          {loading ? (
            <div className="text-center p-20 flex items-center justify-center bg-slate-100 h-[80vh] rounded-xl">
              <Loader2 className="animate-spin mr-3" />
              <h2 className="font-bold text-2xl">Analysing the Wireframe</h2>
            </div>
          ) : (
            <CodeEditor coderesp={coderesp} isready={isReady} />
          )}
        </div>
      </div>
    </div>
  )
}
