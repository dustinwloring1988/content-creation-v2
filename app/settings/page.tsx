'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

// Mock function to simulate Stripe integration
const handleSubscriptionChange = async (newTier: string) => {
  // In a real application, this would interact with Stripe
  console.log(`Changing subscription to ${newTier}`)
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return true
}

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
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [currentTier, setCurrentTier] = useState("free")
  const [isChangingTier, setIsChangingTier] = useState(false)
  const [recentActivities, setRecentActivities] = useState([
    { action: "Changed password", timestamp: "2 days ago" },
    { action: "Updated email preferences", timestamp: "1 week ago" },
    { action: "Upgraded to Pro plan", timestamp: "2 weeks ago" },
  ])

  const handleTierChange = async (newTier: string) => {
    setIsChangingTier(true)
    const success = await handleSubscriptionChange(newTier)
    if (success) {
      setCurrentTier(newTier)
    }
    setIsChangingTier(false)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="change-password">Change Password</TabsTrigger>
            <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Save Changes</Button>
                <Button variant="destructive" onClick={() => window.location.href = '/delete-account'}>
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage your notification settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Use email OTP for login</Label>
                    <p className="text-sm text-muted-foreground">Use OTP via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
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
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Change Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="recent-activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and changes.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{activity.action}</span>
                      <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}