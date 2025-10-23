"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

type TabType = "about" | "experiences" | "recommended"

export default function ProfileWidget() {
  const [activeTab, setActiveTab] = useState<TabType>("about")

  const tabs: { id: TabType; label: string }[] = [
    { id: "about", label: "About Me" },
    { id: "experiences", label: "Experiences" },
    { id: "recommended", label: "Recommended" },
  ]

  const content = {
    about:
      "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. This is a...",
    experiences:
      "Sales Representative at Salesforce (2021-Present)\n• Led multiple enterprise deals\n• Managed key client relationships\n• Exceeded quarterly targets\n\nAccount Executive at Previous Company (2018-2021)\n• Built and managed sales pipeline\n• Developed client strategies",
    recommended: "Recommended connections and resources based on your profile and interests.",
  }

  return (
    <Card className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-card">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-foreground border-b-2 border-blue-500 bg-card"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{content[activeTab]}</p>
      </div>
    </Card>
  )
}
