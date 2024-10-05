'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link href="/terms-and-conditions" className="text-blue-600 hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">Already have an account? </span>
          <Link href="/signin" className="text-sm text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </Layout>
  )
}