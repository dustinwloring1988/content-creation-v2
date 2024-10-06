'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { supabase, changePassword } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { changeSubscription } from '@/lib/stripe'; // Ensure this import is present
import { initStripe } from '@/lib/utils';

const stripe = initStripe();

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals just getting started",
    features: [
      "5 AI-generated content pieces per month",
      "Basic templates",
      "Community support"
    ]
  },
  {
    name: "Hoobist",
    price: "$2.99",
    description: "For posting to your social media accounts",
    features: [
      "35 AI-generated content pieces per month",
      "Basic templates",
      "Community support"
    ]
  },
  {
    name: "Basic",
    price: "$4.99",
    description: "For small teams getting started",
    features: [
      "100 AI-generated content pieces per month",
      "Advanced templates",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "For medium to large teams",
    features: [
      "250 AI-generated content pieces per month",
      "Advanced templates",
      "API access",
      "Priority email support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and organizations",
    features: [
      "Unlimited AI-generated content pieces per month",
      "Advanced templates",
      "API access",
      "Priority email support",
      "Dedicated account manager"
    ]
  }
]

export default function SettingsPage() {
  const [currentTier, setCurrentTier] = useState("free")
  const [isChangingTier, setIsChangingTier] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchUserSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log(user);
      if (user) {
        setDisplayName(user.user_metadata.display_name || '')
        setEmail(user.email || '') // Add this line to set the email

        const { data: settings } = await supabase
          .from('settings')
          .select('theme, language')
          .eq('user_id', user.id)
          .single()
        
        if (settings) {
          setDarkMode(settings.theme === 'dark')
          setLanguage(settings.language)
        }
      }
    }

    fetchUserSettings()
  }, [])

  const handleTierChange = async (newTier: string) => {
    setIsChangingTier(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      let stripeCustomerId = user.user_metadata.stripe_customer_id;

      if (!stripeCustomerId) {
        // Create a new Stripe customer
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId: user.id }
        });

        stripeCustomerId = customer.id;

        // Save the new customer ID to the user's metadata
        await supabase.auth.updateUser({
          data: { stripe_customer_id: stripeCustomerId }
        });
      }

      // Call the changeSubscription function
      const updatedSubscription = await changeSubscription(stripeCustomerId, newTier);
      if (updatedSubscription) {
        setCurrentTier(newTier);
        toast.success('Subscription updated successfully');
      }
    } catch (error) {
      console.error('Error changing subscription:', error);
      toast.error('Failed to change subscription');
    } finally {
      setIsChangingTier(false);
    }
  }

  const handleChangePassword = async () => {
    setPasswordError(null)
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match")
      toast.error("New passwords don't match")
      return
    }
    
    const { user, error } = await changePassword(newPassword) // Adjusted to pass only one argument
    if (user) {
      toast.success('Password changed successfully')
      console.log('Password changed successfully')
      // Reset password fields
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setPasswordError(error || 'Failed to change password')
      toast.error(error || 'Failed to change password')
    }
  }

  const handleSaveChanges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user logged in')

      // Update user profile (display name)
      const { error: updateError } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      })
      if (updateError) throw updateError

      // Update user settings (theme and language)
      const { error: settingsError } = await supabase.from('settings').upsert({
        user_id: user.id,
        theme: darkMode ? 'dark' : 'light',
        language: language
      }, {
        onConflict: 'user_id'
      })
      if (settingsError) throw settingsError

      toast.success('Settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="change-password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} readOnly className="bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle dark mode on or off</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
                <Button variant="destructive" onClick={() => window.location.href = '/delete-account'}>
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>Manage your subscription plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-plan">Current Plan</Label>
                  <Select value={currentTier} onValueChange={handleTierChange} disabled={isChangingTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiers.map((tier) => (
                        <SelectItem key={tier.name} value={tier.name.toLowerCase()}>
                          {tier.name} ({tier.price}/month)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  {tiers.map((tier) => (
                    <Card key={tier.name} className={currentTier === tier.name.toLowerCase() ? 'border-primary' : ''}>
                      <CardHeader>
                        <CardTitle>{tier.name} - {tier.price}/month</CardTitle>
                        <CardDescription>{tier.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside">
                          {tier.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {currentTier !== tier.name.toLowerCase() && (
                          <Button onClick={() => handleTierChange(tier.name.toLowerCase())}>
                            {currentTier === 'free' ? 'Upgrade' : 'Change'} to {tier.name}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="change-password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </CardContent>
              <CardFooter>
                <Button onClick={handleChangePassword}>Change Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}