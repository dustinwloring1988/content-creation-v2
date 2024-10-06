'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Save } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function ContentReviewPage() {
  const [generatedContent, setGeneratedContent] = useState("This is an example of AI-generated content. It would typically be much longer and more detailed, covering the topic requested by the user.")
  const [editedContent, setEditedContent] = useState(generatedContent)
  const router = useRouter()

  const handleSave = () => {
    // Here you would typically save the edited content to your backend
    console.log("Saving content:", editedContent)
  }

  const handleDownload = () => {
    // Here you would typically generate a downloadable file
    console.log("Downloading content:", editedContent)
  }

  const handleRequestFeedback = () => {
    const encodedContent = encodeURIComponent(editedContent)
    router.push(`/content-feedback?content=${encodedContent}`)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Review Generated Content</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Original Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{generatedContent}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Edit Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[200px]"
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="secondary" onClick={handleRequestFeedback}>
                Request Feedback
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  )
}