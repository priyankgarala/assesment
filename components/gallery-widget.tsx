"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftCircle, ArrowRightCircle , Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function GalleryWidget() {
  const [images, setImages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const IMAGES_PER_PAGE = 3
  const totalPages = Math.max(1, Math.ceil(images.length / IMAGES_PER_PAGE))

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

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

  const startIndex = currentPage * IMAGES_PER_PAGE
  const currentImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE)

  // Animation variants for sliding
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  }

  return (
    <Card className="bg-[#363C43] border border-[#3A3F4A] rounded-3xl p-6 shadow-2xl max-w-5xl w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="bg-[#000000] text-white px-7 py-3 rounded-2xl font-medium text-xl shadow-md">
          Gallery
        </button>

        <div className="flex items-center gap-6">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            onClick={handleButtonClick}
          className=" w-34 flex items-center gap-2 bg-[#3A3F4A] hover:bg-[#3A3F4A] text-white text-xs px-4 py-2 rounded-full shadow-[-1px_-2px_4px_0px_rgba(255,255,255,0.3)]"          >
            <Plus className="w-4 h-4 " />
            ADD IMAGE
          </Button>

          <div className="flex items-center gap-5">
            <button
              onClick={handlePrevious}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#454B57] shadow-md transition border border-[#4A5060]"
            >
              <ArrowLeftCircle className="w-12 h-12 text-black" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#454B57] shadow-md transition border border-[#4A5060]"
            >
              <ArrowRightCircle className="w-12 h-12 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Grid with Slide Animation */}
      <div className="relative h-44 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-3 gap-4 absolute w-full"
          >
            {currentImages.length > 0 ? (
              currentImages.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-[#1A1E26] h-40 shadow-md border border-[#3A3F4A] transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_#38bdf8]/60"
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Gallery image ${startIndex + index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 text-sm py-10">
                No images added yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
}
