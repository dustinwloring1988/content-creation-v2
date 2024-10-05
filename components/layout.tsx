'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = false // Replace with actual auth logic

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold">AI Content Platform</Link>
          <nav>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" passHref><Button variant="ghost">Dashboard</Button></Link>
                <Link href="/upload" passHref><Button variant="ghost">Upload</Button></Link>
                <Link href="/files" passHref><Button variant="ghost">Files</Button></Link>
                <Link href="/settings" passHref><Button variant="ghost">Settings</Button></Link>
                <Button variant="ghost">Logout</Button>
              </>
            ) : (
              <>
                <Link href="/signin" passHref><Button variant="ghost">Sign In</Button></Link>
                <Link href="/register" passHref><Button variant="ghost">Register</Button></Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>© 2024 AI Content Platform</div>
          <div>
            <Link href="/privacy" className="mr-4">Privacy Policy</Link>
            <Link href="/terms" className="mr-4">Terms of Service</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}