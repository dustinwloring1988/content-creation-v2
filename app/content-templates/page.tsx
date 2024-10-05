'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Blog Post Outline",
    description: "A structured outline for creating engaging blog posts",
    sections: ["Introduction", "Main Points (3-5)", "Conclusion"]
  },
  {
    id: 2,
    title: "Product Description",
    description: "Template for writing compelling product descriptions",
    sections: ["Features", "Benefits", "Specifications", "Call to Action"]
  },
  {
    id: 3,
    title: "Social Media Post",
    description: "Format for creating attention-grabbing social media content",
    sections: ["Hook", "Main Message", "Call to Action", "Hashtags"]
  },
  {
    id: 4,
    title: "Email Newsletter",
    description: "Structure for crafting informative and engaging newsletters",
    sections: ["Subject Line", "Greeting", "Main Content", "Call to Action", "Footer"]
  }
]

export default function ContentTemplatesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Content Templates</h1>
        <p className="text-muted-foreground">Choose a template to quickly generate content tailored to your needs.</p>
        
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
                <Button className="w-full">
                  <Grid className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}