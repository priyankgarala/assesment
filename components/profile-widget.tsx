"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

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
      "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4 year old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. This is a...",
    experiences:
      "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4 year old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. This is a...",
    recommended:
      "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4 year old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. This is a...",
  }

  return (
    <Card className="bg-[#363C43] border border-[#2A2D33] rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center justify-center bg-[#000000] rounded-3xl p-1 mb-6 shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-lg font-medium py-2.5 rounded-2xl transition-all duration-500 ${
              activeTab === tab.id
                ? "bg-[#292a2d] text-white shadow-md"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="text-gray-300 opacity-50 leading-relaxed text-xl px-1 space-y-4 min-h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
        <p className="whitespace-pre-wrap tracking-normal">{content[activeTab]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
}
