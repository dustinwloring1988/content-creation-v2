'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useState } from 'react'
import SignInPopup from '@/components/SignInPopup'

// Define or import the 'user' variable
const user = getCurrentUser(); // Example function to get the user, replace with actual logic

export default function LandingPage() {
  const router = useRouter()
  const [showSignIn, setShowSignIn] = useState(false)


  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Content Creation Platform</h1>
        <p className="text-xl mb-8">Revolutionize your content strategy with cutting-edge AI technology</p>
        <div className="space-y-4">
          <p className="text-lg">Create high-quality content 10x faster, optimize for SEO, and boost your online presence.</p>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Intelligent Content Generation"
          description="Create high-quality, engaging content in seconds with our advanced AI algorithms. Perfect for blogs, social media, and more."
        />
        <FeatureCard
          title="Multi-Format Support"
          description="Generate content for blogs, social media, emails, and product descriptions - all from a single platform."
        />
        <FeatureCard
          title="SEO Optimization"
          description="Automatically optimize your content for search engines to boost your online visibility and drive organic traffic."
        />
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Our AI Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <BenefitItem
            title="Save Time and Resources"
            description="Reduce content creation time by up to 80%, allowing you to focus on strategy and growth."
          />
          <BenefitItem
            title="Consistent Brand Voice"
            description="Maintain a consistent tone and style across all your content, enhancing brand recognition."
          />
          <BenefitItem
            title="Scale Your Content Output"
            description="Easily create large volumes of content for multiple channels without sacrificing quality."
          />
          <BenefitItem
            title="Data-Driven Insights"
            description="Gain valuable insights into content performance to continually improve your strategy."
          />
        </div>
      </div>
      {showSignIn && (
        <SignInPopup
          onClose={() => setShowSignIn(false)}
          onSignIn={() => {
            setShowSignIn(false);
            router.push('/dashboard');
          }}
          onForgotPassword={() => {
            setShowSignIn(false);
            // Handle forgot password logic here
          }}
        />
      )}
    </Layout>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}