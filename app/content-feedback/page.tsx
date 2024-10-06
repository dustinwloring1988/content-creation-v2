'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { generateChatCompletion } from '@/lib/openai';
import { getCurrentUser, saveGeneratedContent } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ContentFeedbackPage() {
  const [content, setContent] = useState('')
  const [feedbackAreas, setFeedbackAreas] = useState('')
  const [additionalComments, setAdditionalComments] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const contentParam = searchParams.get('content')
    if (contentParam) {
      setContent(decodeURIComponent(contentParam))
    }
  }, [searchParams])

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.error('User not authenticated');
      toast.error('Please log in to submit feedback requests');
      return;
    }

    const userPrompt = `
      Content: ${content}
      
      Areas for Feedback: ${feedbackAreas}
      
      Additional Comments: ${additionalComments}
      
      Please provide detailed, constructive feedback on the submitted content, focusing on the specified areas for feedback. If additional comments are provided, address those points as well.
    `

    try {
      const generatedFeedback = await generateChatCompletion([
        { role: "system", content: "You are an expert content reviewer providing constructive feedback." },
        { role: "user", content: userPrompt }
      ]);

      if (!generatedFeedback) {
        throw new Error('Failed to generate feedback');
      }

      const savedFeedback = await saveGeneratedContent(
        currentUser.id,
        generatedFeedback,
        userPrompt,
        'feedback',
        'constructive'
      );

      if (savedFeedback) {
        toast.success('Feedback generated and saved successfully');
        // You can redirect to a page showing the feedback or clear the form here
        setContent('');
        setFeedbackAreas('');
        setAdditionalComments('');
      } else {
        toast.error('Feedback generated but failed to save');
      }

      // You might want to set the generated feedback to state to display it
      // setGeneratedFeedback(generatedFeedback);
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast.error('Error generating feedback. Please try again.');
    }
  }

  const [generatedFeedback, setGeneratedFeedback] = useState<string | null>(null);

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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-areas">Areas for Feedback</Label>
                <Input
                  id="feedback-areas"
                  placeholder="e.g., Clarity, Tone, Structure"
                  value={feedbackAreas}
                  onChange={(e) => setFeedbackAreas(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-comments">Additional Comments</Label>
                <Textarea
                  id="additional-comments"
                  placeholder="Any specific questions or concerns?"
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating Feedback...' : 'Submit for Feedback'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        {generatedFeedback && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Generated Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{generatedFeedback}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}