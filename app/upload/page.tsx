'use client'
import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from 'lucide-react'

export default function UploadFilePage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle file upload logic here
    console.log('File:', file)
    console.log('Title:', title)
    console.log('Description:', description)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload File</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {file ? file.name : 'Select a file'}
              </span>
            </Label>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter file title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter file description"
            />
          </div>
          <Button type="submit" className="w-full">Upload File</Button>
        </form>
      </div>
    </Layout>
  )
}