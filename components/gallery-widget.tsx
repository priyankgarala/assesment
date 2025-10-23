"use client"

import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function GalleryWidget() {
  const [images, setImages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const IMAGES_PER_PAGE = 3
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // 🔹 Handle Image Upload
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = e.target?.result as string
        setImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    }
  }

  // 🔹 Images for the current page
  const startIndex = currentPage * IMAGES_PER_PAGE
  const currentImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE)

  return (
    <Card className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <h3 className="text-sm font-semibold text-foreground">Gallery</h3>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          onClick={handleButtonClick}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-xs bg-transparent"
        >
          <Plus className="w-4 h-4" />
          ADD IMAGE
        </Button>
      </div>

      {/* Gallery Content */}
      <div className="p-4">
        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {currentImages.map((img, index) => (
            <div
              key={index}
              className="relative bg-muted rounded-lg overflow-hidden h-48"
            >
              <img
                src={img}
                alt={`Gallery image ${startIndex + index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Previous set"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="text-xs font-semibold text-blue-500 bg-blue-500/10 px-3 py-1 rounded">
            Page {currentPage + 1} / {totalPages}
          </div>

          <button
            onClick={handleNext}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Next set"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </Card>
  )
}
