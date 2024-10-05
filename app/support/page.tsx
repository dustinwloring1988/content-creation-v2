'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SupportPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Support form submitted')
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Support</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Subject of your inquiry" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message" rows={4} />
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What file types are supported for upload?</AccordionTrigger>
                <AccordionContent>
                  Our platform supports a wide range of file types, including PDF, DOCX, JPG, PNG, and more. For a complete list of supported file types, please check our documentation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I upgrade my account?</AccordionTrigger>
                <AccordionContent>
                  To upgrade your account, go to the Settings page and click on the "Upgrade Plan" button. You'll be able to choose from our available plans and complete the upgrade process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security measures to protect your information. For more details, please refer to our Privacy Policy.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  )
}