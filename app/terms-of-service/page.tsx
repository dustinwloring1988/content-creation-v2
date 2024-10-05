'use client'

import Layout from '@/components/layout'

export default function TermsOfServicePage() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the AI Platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use of Services</h2>
            <p>You may use our services only as permitted by law and these Terms of Service. You agree not to:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Use our services for any illegal purposes</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
            <p>The content, features, and functionality of our services are owned by AI Platform and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p>AI Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes via email or through our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at legal@aiplatform.com.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
}