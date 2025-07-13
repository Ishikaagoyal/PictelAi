'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/app/provider'
import Link from 'next/link'

function Credits() {
  const { user } = useAuthContext()
  const [userdata, setUserData] = useState<any>()

  useEffect(() => {
    user && getUserCredits()
  }, [user])

  const getUserCredits = async () => {
    const result = await axios.get('/api/user?email=' + user?.email)
    console.log(result.data)
    setUserData(result.data)
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold mb-6">Credits</h2>

      <div className="p-6 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-semibold text-xl">My Credits</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {userdata?.credits ?? 0} Credits left
          </p>
        </div>

        <Link href="/billing">
          <Button className="w-full md:w-auto dark:text-white">Buy More Credits</Button>
        </Link>
      </div>
    </div>
  )
}

export default Credits
