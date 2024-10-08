import Layout from '@/components/layout'
import Link from 'next/link'

export default function TermsAndConditionsPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <div className="space-y-4">
          <p>Welcome to our service. By using our website, you agree to comply with and be bound by the following terms and conditions of use.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">1. Agreement to Terms</h2>
          <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">3. Disclaimer</h2>
          <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitations</h2>
          <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">5. Revisions and Errata</h2>
          <p>The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Links</h2>
          <p>We have not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">7. Modifications</h2>
          <p>We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
        </div>
        <div className="mt-8">
          <Link href="/register" className="text-blue-600 hover:underline">
            Back to Registration
          </Link>
        </div>
      </div>
    </Layout>
  )
}