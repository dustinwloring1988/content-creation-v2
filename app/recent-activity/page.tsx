import Layout from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecentActivityPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Recent Activity</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Generated blog post: "10 Tips for Effective Content Marketing"</li>
              <li>Edited social media caption for product launch</li>
              <li>Accessed "Email Newsletter" template</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
