'use client'
import { useState, useEffect } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const resetToken = searchParams.get('token')
    if (resetToken) {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          const newPassword = ''; // Add this line and set the value appropriately
          const { error } = await supabase.auth.updateUser({ password: newPassword })
          if (error) {
            toast.error('Failed to reset password. Please try again.')
          } else {
            toast.success('Password reset successfully')
            router.push('/login')
          }
        }
      })
    }
  }, [searchParams, router])

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      
      if (error) throw error

      toast.success('Password reset successfully')
      router.push('/login') // Redirect to login page after successful reset
    } catch (error) {
      console.error('Error resetting password:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input 
              id="new-password" 
              type="password" 
              placeholder="Enter new password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              placeholder="Confirm new password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Back to our site
          </Link>
        </div>
      </div>
    </Layout>
  )
}