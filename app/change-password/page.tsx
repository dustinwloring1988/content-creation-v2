'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ChangePasswordPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button type="submit" className="w-full">Change Password</Button>
        </form>
      </div>
    </Layout>
  )
}