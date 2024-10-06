import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface ForgotPasswordPopupProps {
  onClose: () => void
  onSubmit: (email: string) => void
}

export default function ForgotPasswordPopup({ onClose, onSubmit }: ForgotPasswordPopupProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await onSubmit(email)
    setIsLoading(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}