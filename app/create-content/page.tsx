'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, saveGeneratedContent } from '@/lib/supabase' // Update this line
import { generateContent, systemPrompts } from '@/lib/openai'
import { toast } from 'react-hot-toast'

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ContentType = 'blogPost' | 'socialMedia' | 'marketingCopy' | 'email';
type Tone = 'formal' | 'casual' | 'persuasive' | 'informative';

export default function CreateContentPage() {
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setGeneratedContent('')

    const formData = new FormData(e.target as HTMLFormElement)
    const contentType = formData.get('contentType') as ContentType
    const tone = formData.get('tone') as Tone
    const prompt = formData.get('prompt') as string

    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        toast.error('User not authenticated. Please log in and try again.');
        return;
      }

      // Use the systemPrompts to get the appropriate prompt for the content type and tone
      const systemPrompt = systemPrompts[contentType]?.[tone]
      
      // Ensure both systemPrompt and prompt are provided
      if (!systemPrompt || !prompt) {
        toast.error('System prompt or user prompt is missing. Please try again.');
        return;
      }
      
      // Generate content using the system prompt and user prompt
      const generatedContent = await generateContent(prompt, systemPrompt, contentType)
      if (!generatedContent) {
        toast.error('Failed to generate content. Please try again.');
        return;
      }
      
      setGeneratedContent(generatedContent)

      // Save the generated content
      const savedContent = await saveGeneratedContent(currentUser.id, generatedContent, prompt, contentType, tone)
      if (savedContent !== null) {
        toast.success('Content generated and saved successfully')
      } else {
        toast.error('Content generated but may not have been saved')
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false)
    }
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
            <Textarea id="prompt" name="prompt" placeholder="e.g., Write a blog post about the benefits of AI in content creation" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select name="contentType">
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blogPost">Blog Post</SelectItem>
                  <SelectItem value="socialMedia">Social Media Post</SelectItem>
                  <SelectItem value="marketingCopy">Marketing Copy</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select name="tone">
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
        
        {(isGenerating || generatedContent) && (
          <Card>
            <CardHeader>
              <CardTitle>{isGenerating ? 'Generating Content' : 'Generated Content'}</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <p>Please wait...</p>
              ) : (
                <>
                  <p>{generatedContent}</p>
                  <div className="mt-4 space-x-2">
                    <Button variant="outline">Edit</Button>
                    <Button>Save</Button>
                    <Button variant="secondary">Download</Button>
                    <Button variant="outline" onClick={() => copyToClipboard(generatedContent)}>
                      Copy
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}