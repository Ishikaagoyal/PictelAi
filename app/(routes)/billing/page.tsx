'use client'

import { useAuthContext } from '@/app/provider'
import { db } from '@/configs/db'
import { usersTable } from '@/configs/schema'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Billing() {
  const Options = [
    { id: 1, price: 1.99, credits: 10 },
    { id: 2, price: 2.99, credits: 30 },
    { id: 3, price: 5.99, credits: 75 },
    { id: 4, price: 9.99, credits: 150 },
  ]

  const router = useRouter()
  const { user } = useAuthContext()

  const [selectedOption, setSelectedOption] = useState<number>(0)
  const [selectedPrice, setSelectedPrice] = useState<number>(0)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const notifyError = (msg: string) => toast.error(`❌ ${msg}`)
  const notifySuccess = (msg: string) => toast.success(`✅ ${msg}`)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`/api/user?email=${user.email}`)
          setUserData(res.data)
        } catch {
          notifyError('Failed to load user data')
        }
      }
    }

    fetchUserData()
  }, [user])

  useEffect(() => {
    const selected = Options.find((o) => o.id === selectedOption)
    if (selected) {
      setSelectedPrice(selected.price)
    }
  }, [selectedOption])

  const onPaymentSuccess = async () => {
    const selected = Options.find((o) => o.id === selectedOption)
    if (!selected || !user?.email || userData?.credits === undefined) return

    setLoading(true)

    try {
      const newCredits = selected.credits + (userData.credits || 0)

      await db
        .update(usersTable)
        .set({ credits: newCredits })
        .where(eq(usersTable.email, user.email))

      setUserData((prev: any) => ({ ...prev, credits: newCredits }))
      notifySuccess(`${selected.credits} credits added!`)
      setShowModal(true)
    } catch (error) {
      console.error('Payment update failed:', error)
      notifyError('Failed to update credits.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-center md:px-20 lg:px-40 py-12">
      <h2 className="text-3xl font-bold tracking-tight">Add More Credits</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-10 items-start justify-center">
        {/* Options */}
        <div className="flex flex-col items-center w-full">
          {Options.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={cn(
                'w-full max-w-sm p-6 border rounded-xl mb-4 cursor-pointer transition-all duration-200',
                'hover:shadow-md hover:scale-[1.02]',
                'dark:border-gray-700',
                selectedOption === option.id
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-primary'
                  : 'bg-blue-100 text-primary dark:bg-gray-900 dark:text-blue-200'
              )}
            >
              <h2 className="text-lg font-semibold">Get {option.credits} Credits</h2>
              <h2 className="font-bold text-2xl mt-2">${option.price}</h2>
            </div>
          ))}
        </div>

        {/* PayPal */}
        <div className="flex flex-col items-center w-full max-w-md">
          {selectedPrice > 0 && (
            <>
              <PayPalButtons
                style={{ layout: 'vertical' }}
                disabled={!selectedOption || loading}
                createOrder={(data, actions) => {
                  //@ts-ignore
                  return actions.order.create({
                    purchase_units: [
                      {
                        //@ts-ignore
                        amount: {
                          value: selectedPrice.toFixed(2),
                          currency_code: 'USD',
                        },
                      },
                    ],
                  })
                }}
                onApprove={async () => {
                  await onPaymentSuccess()
                }}
                onCancel={() => notifyError('Payment canceled by user')}
              />
              {loading && (
                <p className="text-sm text-muted-foreground mt-2 animate-pulse">
                  Processing your payment...
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Your credits have been added. You can now return to your dashboard and continue creating.
          </p>
          <DialogFooter className="mt-4">
            <Button
              onClick={() => {
                setShowModal(false)
                router.replace('/dashboard')
              }}
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Billing
