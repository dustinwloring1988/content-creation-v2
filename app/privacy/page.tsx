'use client'

import Layout from '@/components/layout'

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>Welcome to the AI Platform Privacy Policy. This policy describes how we collect, use, and protect your personal information when you use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, upload files, or contact us for support. This may include:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Name and email address</li>
              <li>Content of files you upload</li>
              <li>Information about how you use our services</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You can manage your information in your account settings or contact us for assistance.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at privacy@aiplatform.com.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
}