'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Trash2 } from 'lucide-react'

// Mock data for content items
const mockContentItems = [
  { id: 1, title: "10 Tips for Effective Content Marketing", type: "Blog Post", date: "2023-05-15" },
  { id: 2, title: "New Product Launch Announcement", type: "Social Media Post", date: "2023-05-18" },
  { id: 3, title: "Monthly Newsletter: June Edition", type: "Email", date: "2023-06-01" },
  // Add more mock items as needed
]

export default function MyContentPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [contentType, setContentType] = useState('')

  const filteredContent = mockContentItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (contentType === 'all' || item.type === contentType)
  )

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Content</h1>
        
        <div className="flex space-x-4">
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Blog Post">Blog Post</SelectItem>
              <SelectItem value="Social Media Post">Social Media Post</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredContent.length === 0 && (
          <p className="text-center text-muted-foreground">No content items found.</p>
        )}
      </div>
    </Layout>
  )
}