'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Trash2 } from 'lucide-react'
import { getAllUserContents, getCurrentUser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { deleteUserContent, updateUserContent } from '@/lib/supabase'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from 'react-hot-toast'

interface ContentItem {
  id: string;
  title: string;
  type: string;
  created_at: string;
  prompt: string;
  content: string;
}

export default function MyContentPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [contentType, setContentType] = useState('all')
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [viewingContent, setViewingContent] = useState<ContentItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id)
    setEditingTitle(item.title)
  }

  const handleSaveEdit = async (item: ContentItem) => {
    try {
      await updateUserContent(item.id, { prompt: editingTitle })
      setContentItems(contentItems.map(i => i.id === item.id ? { ...i, title: editingTitle, prompt: editingTitle } : i))
      setEditingId(null)
      toast.success('Title updated successfully')
    } catch (error) {
      console.error('Error updating title:', error)
      toast.error('Failed to update title')
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      await deleteUserContent(id)
      setContentItems(contentItems.filter(item => item.id !== id))
      toast.success('Content deleted successfully')
    } catch (error) {
      console.error('Error deleting content:', error)
      toast.error('Failed to delete content')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleView = (item: ContentItem) => {
    setViewingContent(item)
  }

  useEffect(() => {
    const fetchUserContent = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/')
          return
        }

        const userContents = await getAllUserContents(currentUser.id)
        if (userContents) {
          const formattedContents = userContents.map(item => ({
            id: item.id,
            title: item.prompt.slice(0, 64) || 'Untitled',
            type: item.content_type || 'Unknown',
            created_at: new Date(item.created_at).toLocaleDateString(),
            prompt: item.prompt,
            content: item.content
          }))
          setContentItems(formattedContents)
        }
      } catch (err) {
        console.error('Error fetching user content:', err)
        setError('Error fetching user content. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserContent()
  }, [router])

  const filteredContent = contentItems.filter(item => 
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
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => handleSaveEdit(item)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(item)}
                    />
                  ) : (
                    item.title
                  )}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} disabled={isDeleting}>
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
        
        {isLoading && (
          <p className="text-center text-muted-foreground">Loading content...</p>
        )}
        
        {error && (
          <p className="text-center text-muted-foreground">{error}</p>
        )}
        
        {viewingContent && (
          <Dialog open={!!viewingContent} onOpenChange={() => setViewingContent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{viewingContent.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <h3 className="font-semibold">Prompt:</h3>
                <p>{viewingContent.prompt}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Generated Content:</h3>
                <p>{viewingContent.content}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  )
}