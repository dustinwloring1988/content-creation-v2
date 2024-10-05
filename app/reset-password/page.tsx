'use client'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function ResetPasswordPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button type="submit" className="w-full">Reset Password</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/signin" className="text-sm text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </Layout>
  )
}