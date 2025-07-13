'use client'

import { auth } from '@/configs/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

interface AuthenticationProps {
  children: ReactNode
}

function Authentication({ children }: AuthenticationProps) {
  const router = useRouter()
  const provider = new GoogleAuthProvider()

  const onButtonPress = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent accidental link/form behavior

    try {
      const result = await signInWithPopup(auth, provider)
      console.log('User:', result.user)
      // router.push('/dashboard') // Optional redirect after login
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <button
      onClick={onButtonPress}
      className="cursor-pointer bg-transparent border-none p-0 m-0"
    >
      {children}
    </button>
  )
}

export default Authentication
