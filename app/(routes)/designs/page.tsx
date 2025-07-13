'use client'
import { useAuthContext } from '@/app/provider'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Designcard from './_components/Designcard'
import SkeletonCard from './_components/SkeletonCard'

function Designs() {
  const { user } = useAuthContext()
  const [wireframelist, setWireframeList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    user && getAllDesigns()
  }, [user])

  const getAllDesigns = async () => {
    try {
      const result = await axios.get('/api/wireframe-to-code?email=' + user?.email)
      setWireframeList(result.data)
    } catch (err) {
      console.error('Error loading designs', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-8">
      <h2 className="font-bold text-3xl mb-8">Wireframe & code</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : wireframelist?.map((item, index) => <Designcard key={index} item={item} />)}
      </div>
    </div>
  )
}

export default Designs
