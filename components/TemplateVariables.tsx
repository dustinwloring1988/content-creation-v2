import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateVariablesProps {
  template: any; // Replace 'any' with a more specific type if possible
  onBack: () => void;
}

export default function TemplateVariables({ template, onBack }: TemplateVariablesProps) {
  const [variables, setVariables] = useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, variable: string) => {
    setVariables({ ...variables, [variable]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically call your AI service to generate content
    console.log('Generating content with variables:', variables)
    // Implement the API call to your AI service here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {template.sections.map((section: string, index: number) => (
            <div key={index}>
              <Label htmlFor={`variable-${index}`}>{section}</Label>
              <Input
                id={`variable-${index}`}
                placeholder={`Enter ${section.toLowerCase()}`}
                onChange={(e) => handleInputChange(e, section)}
              />
            </div>
          ))}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit">Generate Content</Button>
      </CardFooter>
    </Card>
  )
}
