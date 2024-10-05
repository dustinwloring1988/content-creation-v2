'use client'

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash } from 'lucide-react'

interface File {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
}

export default function ViewFilesPage() {
  const [files, setFiles] = useState<File[]>([
    { id: '1', name: 'document.pdf', type: 'PDF', size: '2.5 MB', uploadDate: '2023-05-15' },
    { id: '2', name: 'image.jpg', type: 'Image', size: '1.8 MB', uploadDate: '2023-05-14' },
    { id: '3', name: 'spreadsheet.xlsx', type: 'Excel', size: '3.2 MB', uploadDate: '2023-05-13' },
  ])

  const handleDelete = (id: string) => {
    setFiles(files.filter(file => file.id !== id))
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Files</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.uploadDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(file.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}