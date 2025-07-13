// hooks/useUserData.ts
'use client'
import { useAuthContext } from '@/app/provider'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function useUserData() {
  const { user } = useAuthContext()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/user?email=${user.email}`).then((res) => {
        setUserData(res.data)
      })
    }
  }, [user])

  return { userData, setUserData }
}
