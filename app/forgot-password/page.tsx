'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="mb-4">Enter your email address and we'll send you instructions to reset your password.</p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <Button type="submit" className="w-full">Send Reset Instructions</Button>
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