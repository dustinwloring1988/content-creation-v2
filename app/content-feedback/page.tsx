'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContentFeedbackPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted")
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Request Content Feedback</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Submit Your Content for Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Your Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your content here..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-areas">Areas for Feedback</Label>
                <Input
                  id="feedback-areas"
                  placeholder="e.g., Clarity, Tone, Structure"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-comments">Additional Comments</Label>
                <Textarea
                  id="additional-comments"
                  placeholder="Any specific questions or concerns?"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit for Feedback</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  )
}