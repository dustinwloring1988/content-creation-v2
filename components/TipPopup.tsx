import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from 'lucide-react'

interface TipPopupProps {
  title: string;
  content: string;
  onClose: () => void;
}

export function TipPopup({ title, content, onClose }: TipPopupProps) {
  const contentLines = content.split('\n\n');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {contentLines.map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
