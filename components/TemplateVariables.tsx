import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, saveGeneratedContent } from '@/lib/supabase'
import { generateContent } from '@/lib/openai';

interface TemplateVariablesProps {
  template: any; // Replace 'any' with a more specific type if possible
  onBack: () => void;
}

export default function TemplateVariables({ template, onBack }: TemplateVariablesProps) {
  const [variables, setVariables] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContents, setGeneratedContents] = useState<{ id: number, content: string, title: string }[]>([])
  const [editingTitle, setEditingTitle] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, variable: string) => {
    setVariables({ ...variables, [variable]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }
      const prompt = template.prompt.replace(/\{(\w+)\}/g, (_: string, key: string) => (variables as Record<string, string>)[key] || '');
      const generatedContent = await generateContent(prompt, template.title, currentUser.id);

      if (generatedContent) {
        const newContent = { id: Date.now(), content: generatedContent, title: `Generated Content ${generatedContents.length + 1}` };
        setGeneratedContents([...generatedContents, newContent]);

        const savedContent = await saveGeneratedContent(
          currentUser.id,
          generatedContent,
          prompt,
          template.title,
          'default'
        );

        if (savedContent) {
          console.log('Content saved successfully');
        } else {
          console.error('Failed to save content');
        }
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      console.log('Content copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  const handleDelete = (id: number) => {
    setGeneratedContents(generatedContents.filter(content => content.id !== id));
  }

  const handleRename = (id: number, newTitle: string) => {
    setGeneratedContents(generatedContents.map(content => content.id === id ? { ...content, title: newTitle } : content));
  }

  return (
    <Card className="p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {template.sections.map((section: string, index: number) => (
            <div key={index} className="flex flex-col space-y-2">
              <Label htmlFor={`variable-${index}`} className="font-medium">{section}</Label>
              <Input
                id={`variable-${index}`}
                placeholder={`Enter ${section.toLowerCase()}`}
                onChange={(e) => handleInputChange(e, section)}
                className="border rounded-md p-2"
              />
            </div>
          ))}
          <CardFooter className="flex justify-between mt-4">
            <Button variant="outline" onClick={onBack}>Back</Button>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </Button>
          </CardFooter>
        </form>
        {generatedContents.map(({ id, content, title }) => (
          <Card key={id} className="mt-6 p-4 border rounded-md shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {editingTitle === String(id) ? (
                  <Input
                    value={title}
                    onChange={(e) => handleRename(id, e.target.value)}
                    onBlur={() => setEditingTitle(null)}
                    className="border-b-2"
                  />
                ) : (
                  <span onClick={() => setEditingTitle(String(id))} className="cursor-pointer">{title}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <p className="whitespace-pre-wrap">{content}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => handleCopy(content)}>Copy</Button>
              <Button variant="outline" onClick={() => handleDelete(id)}>Delete</Button>
              <Button variant="outline" onClick={() => setEditingTitle(String(id))}>Rename</Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
