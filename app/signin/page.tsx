'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function SignInPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <Link href="/register" className="text-sm text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </Layout>
  )
}