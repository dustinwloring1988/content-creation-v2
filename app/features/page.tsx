'use client'

import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals just getting started",
    features: [
      "5 AI-generated content pieces per month",
      "Basic templates",
      "Comunity support"
    ]
  },
  {
    name: "Hoobist",
    price: "$2.99",
    description: "For posting to your social media accounts",
    features: [
      "35 AI-generated content pieces per month",
      "Basic templates",
      "Comunity support"
    ]
  },
  {
    name: "Basic",
    price: "$4.99",
    description: "For small teams getting started",
    features: [
      "100 AI-generated content pieces per month",
      "Advanced templates",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "For medium to large teams",
    features: [
      "250 AI-generated content pieces per month",
      "Advanced templates",
      "API access",
      "Priority email support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and organizations",
    features: [
      "Unlimited AI-generated content pieces per month",
      "Advanced templates",
      "API access",
      "Priority email support",
      "Dedicated account manager"
    ]
  }
]

export default function FeaturesPage() {
  return (
    <Layout>
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="mt-2 text-muted-foreground">Select the perfect plan for your content creation needs</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <Card key={index} className={index === 1 ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{tier.price}</p>
                {tier.name !== "Enterprise" && <p className="text-muted-foreground">per month</p>}
                <ul className="mt-4 space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                  {tier.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}