'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid } from "lucide-react"
import TemplateVariables from '@/components/TemplateVariables'
import { generateContent } from '@/lib/openai';
import { getCurrentUser, saveGeneratedContent } from '@/lib/supabase';

const templates = [
  {
    id: 1,
    title: "Blog Post Outline",
    description: "A structured outline for creating engaging blog posts",
    sections: ["Introduction", "Main Points (3-5)", "Key Takeaways", "Conclusion"],
    prompt: "Create a blog post outline about {topic}. Include an introduction, {number_of_main_points} main points, key takeaways, and a conclusion."
  },
  {
    id: 2,
    title: "Product Description",
    description: "Template for writing compelling product descriptions",
    sections: ["Features", "Benefits", "Specifications", "Call to Action"],
    prompt: "Write a product description for {product_name}. Highlight its key features, benefits, specifications, and include a compelling call to action."
  },
  {
    id: 3,
    title: "Social Media Post",
    description: "Format for creating attention-grabbing social media content",
    sections: ["Hook", "Main Message", "Call to Action", "Hashtags"],
    prompt: "Create a social media post for {platform} about {topic}. Include an attention-grabbing hook, main message, call to action, and relevant hashtags."
  },
  {
    id: 4,
    title: "Email Newsletter",
    description: "Structure for crafting informative and engaging newsletters",
    sections: ["Subject Line", "Main Content", "Call to Action", "Footer"],
    prompt: "Compose an email newsletter about {newsletter_topic}. Write an engaging subject line, main content, a clear call to action, and an appropriate footer."
  },
  {
    id: 5,
    title: "Case Study",
    description: "Template for creating compelling case studies",
    sections: ["Client Background", "Challenge", "Solution", "Results"],
    prompt: "Develop a case study for {client_name}. Include the client's background, the challenge they faced, your solution, and the results achieved."
  },
  {
    id: 6,
    title: "Press Release",
    description: "Structure for writing effective press releases",
    sections: ["Headline", "Lead Paragraph", "Body", "Boilerplate"],
    prompt: "Write a press release about {announcement}. Create an attention-grabbing headline, a concise lead paragraph, informative body content, and include a company boilerplate."
  },
  {
    id: 7,
    title: "Video Script",
    description: "Outline for creating engaging video content",
    sections: ["Introduction", "Main Content", "Call to Action", "Outro"],
    prompt: "Develop a video script about {video_topic}. Include an engaging introduction, main content points, a clear call to action, and a memorable outro."
  },
  {
    id: 8,
    title: "Podcast Episode",
    description: "Format for planning and structuring podcast episodes",
    sections: ["Intro and Hook", "Topic Discussion", "Guest Interview", "Closing Thoughts"],
    prompt: "Plan a podcast episode about {podcast_topic}. Create an intro with a hook, outline the main topic discussion, prepare questions for the guest {guest_name}, and summarize with closing thoughts."
  },
  {
    id: 9,
    title: "White Paper",
    description: "Template for creating informative white papers",
    sections: ["Executive Summary", "Problem Statement", "Proposed Solution", "Conclusion"],
    prompt: "Write a white paper on {white_paper_topic}. Include an executive summary, clearly state the problem, propose a detailed solution, and provide a strong conclusion."
  }
]

// Define the type for selectedTemplate
interface Template {
    prompt: string;
    // Add other properties if needed
}

// Define the getSelectedTemplate function
function getSelectedTemplate(): Template {
    // Implement logic to retrieve the selected template
    return {} as Template; // Replace with actual logic
}

// Assuming getSelectedTemplate is a function that returns the selected template
const selectedTemplate = getSelectedTemplate();

function handleNoTemplateSelected() {
  console.error('No template selected');
  return null;
}

if (!selectedTemplate) {
  handleNoTemplateSelected();
}

export default function ContentTemplatesPage() {
  const [generatedContent, setGeneratedContent] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleUseTemplate = async (template: any) => {
    setSelectedTemplate(template)
  }

  const handleGenerateContent = async (variables: any) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    if (!selectedTemplate) {
      console.error('No template selected');
      return;
    }

    const prompt = selectedTemplate.prompt.replace(/\{(\w+)\}/g, (_: string, key: string) => variables[key] || '');
    console.log('Generating content with prompt:', prompt);

    try {
      const systemPrompt = `You are generating content for a ${selectedTemplate.title}.`;
      const generatedContent = await generateContent(prompt, systemPrompt, selectedTemplate.title);

      if (!generatedContent) {
        console.error('Failed to generate content');
        return;
      }

      setGeneratedContent(generatedContent);

      const savedContent = await saveGeneratedContent(
        currentUser.id,
        generatedContent,
        prompt,
        selectedTemplate.title,
        'default'
      );

      if (savedContent) {
        console.log('Content generated and saved successfully');
      } else {
        console.error('Content generated but failed to save');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Content Templates</h1>
        <p className="text-muted-foreground">Choose a template to quickly generate content tailored to your needs.</p>
        
        {selectedTemplate ? (
          <div>
            <TemplateVariables template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
            {/* <Button onClick={() => handleGenerateContent(selectedTemplate.variables)}>Generate Content</Button> */}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {template.sections.map((section, index) => (
                      <li key={index}>{section}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleUseTemplate(template)}>
                    <Grid className="mr-2 h-4 w-4" />
                    Generate Content
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}