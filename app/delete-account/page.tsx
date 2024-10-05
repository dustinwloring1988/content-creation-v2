'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DeleteAccountPage() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock function to simulate account deletion
  const deleteAccount = async () => {
    setIsDeleting(true)
    setError(null)
    
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulating a successful deletion
    setIsDeleting(false)
    setIsDeleted(true)
    
    // In case of an error, you would set the error state instead
    // setError("An error occurred while deleting your account. Please try again.")
  }

  if (isDeleted) {
    return (
      <Layout>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Account Deleted</CardTitle>
            <CardDescription>Your account has been successfully deleted.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>We're sorry to see you go. If you change your mind, you can always create a new account.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.href = "/"}>Return to Home</Button>
          </CardFooter>
        </Card>
      </Layout>
    )
  }

  return (
    <Layout>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2" />
            Delete Account
          </CardTitle>
          <CardDescription>This action cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.</p>
          {error && <p className="text-destructive mb-4">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
          <Button variant="destructive" onClick={deleteAccount} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}