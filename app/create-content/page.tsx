'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateContentPage() {
  const [generatedContent, setGeneratedContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call your AI service to generate content
    // For this example, we'll just set some placeholder text
    setGeneratedContent("This is where the AI-generated content would appear. In a real application, this would be the result of processing the user's input through an AI model.")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here to inform the user that the content has been copied
      console.log('Content copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Create New Content</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="prompt">Enter your prompt or keywords</Label>
            <Textarea id="prompt" placeholder="e.g., Write a blog post about the benefits of AI in content creation" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select>
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog-post">Blog Post</SelectItem>
                  <SelectItem value="social-media">Social Media Post</SelectItem>
                  <SelectItem value="marketing-copy">Marketing Copy</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="informative">Informative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit">Generate Content</Button>
        </form>
        
        {generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{generatedContent}</p>
              <div className="mt-4 space-x-2">
                <Button variant="outline">Edit</Button>
                <Button>Save</Button>
                <Button variant="secondary">Download</Button>
                <Button variant="outline" onClick={() => copyToClipboard(generatedContent)}>
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}