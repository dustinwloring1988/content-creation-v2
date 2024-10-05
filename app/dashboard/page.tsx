'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowRight, FileText, Folder, MessageSquare, Settings, Clock } from 'lucide-react'
import { useState } from 'react'
import { TipPopup } from '@/components/TipPopup'

export default function Dashboard() {
  const userName = "John" // Replace with actual user name from authentication
  const [popupContent, setPopupContent] = useState<{ title: string; content: string } | null>(null)

  const tips = [
    {
      title: "5 Strategies to Improve Your Content Creation",
      content: "1. Know your audience\n\n2. Use data to inform your content\n\n3. Create a content calendar\n\n4. Optimize for SEO\n\n5. Repurpose your content"
    },
    {
      title: "Understanding AI in Content Generation",
      content: "AI can help with content ideation, writing assistance, and even full article generation. However, it's important to review and edit AI-generated content to ensure accuracy and maintain your brand voice."
    },
    {
      title: "Best Practices for SEO-Friendly Content",
      content: "1. Use relevant keywords\n\n2. Create high-quality, original content\n\n3. Optimize your meta tags\n\n4. Use header tags (H1, H2, etc.) effectively\n\n5. Include internal and external links\n\n6. Optimize images with alt text"
    },
    {
      title: "Mastering the Art of Storytelling in Content",
      content: "1. Start with a compelling hook\n\n2. Develop relatable characters or scenarios\n\n3. Create a clear narrative structure\n\n4. Use vivid descriptions and sensory details\n\n5. Incorporate emotional elements\n\n6. End with a memorable conclusion or call-to-action"
    },
    {
      title: "Leveraging User-Generated Content for Authenticity",
      content: "1. Encourage customer reviews and testimonials\n\n2. Run social media contests for user submissions\n\n3. Feature customer success stories\n\n4. Create a branded hashtag for user content\n\n5. Implement a loyalty program with content creation incentives\n\n6. Always obtain permission before using UGC\n\n7. Showcase UGC across multiple marketing channels"
    }
  ]

  const openPopup = (index: number) => {
    setPopupContent(tips[index])
  }

  const closePopup = () => {
    setPopupContent(null)
  }

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
              {tips.map((tip, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:underline p-0 h-auto"
                    onClick={() => openPopup(index)}
                  >
                    {tip.title}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      {popupContent && (
        <TipPopup
          title={popupContent.title}
          content={popupContent.content}
          onClose={closePopup}
        />
      )}
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