import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { registerUser } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface RegisterPopupProps {
  onClose: () => void
  onRegister: (user: any) => void
}

export default function RegisterPopup({ onClose, onRegister }: RegisterPopupProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const { user, error } = await registerUser(email, password)

      if (error) {
        console.error("Registration error:", error)
        setError(error.message)
        toast.error(error.message)
      } else if (user) {
        setRegistrationComplete(true)
        toast.success("Registration successful. Please check your email to verify your account.")
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err)
      setError("An unexpected error occurred. Please try again.")
      toast.error("An unexpected error occurred. Please try again.")
    }
  }

  if (registrationComplete) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful</DialogTitle>
          </DialogHeader>
          <p>Please check your email to verify your account before logging in.</p>
          <Button onClick={onClose}>Close</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}