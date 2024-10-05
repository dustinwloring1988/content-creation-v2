'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowRight, FileText, Folder, MessageSquare, Settings, Clock } from 'lucide-react'

export default function Dashboard() {
  const userName = "John" // Replace with actual user name from authentication

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="Create New Content"
            icon={<FileText className="h-6 w-6" />}
            href="/create-content"
          />
          <QuickActionCard
            title="View My Content"
            icon={<Folder className="h-6 w-6" />}
            href="/my-content"
          />
          <QuickActionCard
            title="Access Content Templates"
            icon={<FileText className="h-6 w-6" />}
            href="/content-templates"
          />
          <QuickActionCard
            title="Request Feedback"
            icon={<MessageSquare className="h-6 w-6" />}
            href="/content-feedback"
          />
          <QuickActionCard
            title="Manage Settings"
            icon={<Settings className="h-6 w-6" />}
            href="/settings"
          />
          <QuickActionCard
            title="Recent Activity"
            icon={<Clock className="h-6 w-6" />}
            href="/recent-activity"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tips and Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  5 Strategies to Improve Your Content Creation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Understanding AI in Content Generation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Best Practices for SEO-Friendly Content
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

function QuickActionCard({ title, icon, href }: { title: string; icon: React.ReactNode; href: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Link href={href} className="flex items-center justify-between group">
          <div className="flex items-center space-x-4">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}