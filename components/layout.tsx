'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import SignInPopup from '@/components/SignInPopup'
import RegisterPopup from '@/components/RegisterPopup'
import ForgotPasswordPopup from '@/components/ForgotPasswordPopup'
import {LogIn, UserPlus, Key } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleSignIn = (email: string, password: string) => {
    // Implement sign-in logic here
    console.log('Sign in:', email, password)
    setShowSignIn(false)
    setIsLoggedIn(true)
  }

  const handleRegister = (email: string, password: string) => {
    // Implement register logic here
    console.log('Register:', email, password)
    setShowRegister(false)
  }

  const handleForgotPassword = (email: string) => {
    // Implement forgot password logic here
    console.log('Forgot password:', email)
    setShowForgotPassword(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold">AI Content Platform</Link>
          <nav>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" passHref><Button variant="ghost">Dashboard</Button></Link>
                <Link href="/settings" passHref><Button variant="ghost">Settings</Button></Link>
                <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>Logout</Button>
              </>
            ) : (
              <>
                <div className="flex space-x-4">
            <Button onClick={() => setShowSignIn(true)}>
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
            <Button onClick={() => setShowRegister(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Register
            </Button>
            <Button variant="ghost" onClick={() => setShowForgotPassword(true)}>
              <Key className="mr-2 h-4 w-4" /> Forgot Password
            </Button>
          </div>
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
            <Link href="/privacy-policy" className="mr-4">Privacy Policy</Link>
            <Link href="/terms-of-service" className="mr-4">Terms of Service</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </footer>

      {showSignIn && (
        <SignInPopup
          onClose={() => setShowSignIn(false)}
          onSignIn={handleSignIn}
          onForgotPassword={() => {
            setShowSignIn(false)
            setShowForgotPassword(true)
          }}
        />
      )}
      {showRegister && (
        <RegisterPopup
          onClose={() => setShowRegister(false)}
          onRegister={handleRegister}
        />
      )}
      {showForgotPassword && (
        <ForgotPasswordPopup
          onClose={() => setShowForgotPassword(false)}
          onSubmit={handleForgotPassword}
        />
      )}
    </div>
  )
}