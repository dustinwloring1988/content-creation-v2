'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowRight, FileText, Folder, MessageSquare, Settings, Clock, LogIn, UserPlus, Key } from 'lucide-react'
import { useState } from 'react'
import { TipPopup } from '@/components/TipPopup'
import SignInPopup from '@/components/SignInPopup'
import RegisterPopup from '@/components/RegisterPopup'
import ForgotPasswordPopup from '@/components/ForgotPasswordPopup'

export default function Dashboard() {
  const [userName, setUserName] = useState<string | null>(null)
  const [popupContent, setPopupContent] = useState<{ title: string; content: string } | null>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

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
      title: "Leveraging User-Generated Content",
      content: "1. Encourage customer reviews and testimonials\n\n2. Run social media contests for user submissions\n\n3. Feature customer success stories\n\n4. Create a branded hashtag for user content\n\n5. Implement a loyalty program with content creation incentives\n\n6. Always obtain permission before using UGC\n\n7. Showcase UGC across multiple marketing channels"
    },
    {
      title: "Harnessing the Power of Visual Content",
      content: "1. Use high-quality images and graphics\n\n2. Create infographics to simplify complex information\n\n3. Incorporate videos for higher engagement\n\n4. Use consistent branding across all visuals\n\n5. Optimize images for faster loading times\n\n6. Add alt text to images for accessibility"
    },
    {
      title: "Effective Email Marketing Strategies",
      content: "1. Segment your email list for targeted content\n\n2. Craft compelling subject lines\n\n3. Personalize email content\n\n4. Use A/B testing to optimize performance\n\n5. Include clear calls-to-action\n\n6. Ensure mobile responsiveness\n\n7. Monitor and analyze email metrics"
    },
    {
      title: "Creating Engaging Social Media Content",
      content: "1. Know your audience on each platform\n\n2. Use platform-specific features (e.g., Instagram Stories, Twitter polls)\n\n3. Encourage user interaction and engagement\n\n4. Share behind-the-scenes content\n\n5. Utilize trending topics and hashtags\n\n6. Post consistently using a content calendar\n\n7. Collaborate with influencers or other brands"
    },
    {
      title: "Optimizing Content for Voice Search",
      content: "1. Focus on conversational keywords and phrases\n\n2. Create content that answers specific questions\n\n3. Optimize for featured snippets\n\n4. Improve website loading speed\n\n5. Ensure mobile-friendliness\n\n6. Use structured data markup\n\n7. Create local content for 'near me' searches"
    },
    {
      title: "Measuring Content Marketing Success",
      content: "1. Set clear, measurable goals\n\n2. Track website traffic and engagement metrics\n\n3. Monitor conversion rates\n\n4. Analyze social media performance\n\n5. Measure SEO improvements\n\n6. Conduct regular content audits\n\n7. Use tools like Google Analytics and social media insights"
    }
  ]

  const openPopup = (index: number) => {
    setPopupContent(tips[index])
  }

  const closePopup = () => {
    setPopupContent(null)
  }

  const handleSignIn = (email: string, password: string) => {
    // Implement sign-in logic here
    console.log('Sign in:', email, password)
    setShowSignIn(false)
    setUserName("John") // Replace with actual user name from authentication
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
    <Layout>
      <div className="space-y-6">
        {userName ? (
          <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
        ) : (
          <div className="flex space-x-4">
          <p>No user logged in</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="Create New Content From Scratch"
            icon={<FileText className="h-6 w-6" />}
            href="/create-content"
          />
          <QuickActionCard
            title="New Content From Templates"
            icon={<FileText className="h-6 w-6" />}
            href="/content-templates"
          />
          <QuickActionCard
            title="Request Feedback From AI"
            icon={<MessageSquare className="h-6 w-6" />}
            href="/content-feedback"
          />
          <QuickActionCard
            title="View My Content"
            icon={<Folder className="h-6 w-6" />}
            href="/my-content"
          />
          <QuickActionCard
            title="Manage Settings"
            icon={<Settings className="h-6 w-6" />}
            href="/settings"
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