"use client"

import ProfileWidget from "@/components/profile-widget"
import GalleryWidget from "@/components/gallery-widget"


export default function AssignmentPage() {
  return (
    <div className="min-h-screen bg-[#1B1E24] text-white flex items-center justify-center px-8 py-12">
      {/* Full layout divided into left and right */}
      <div className="flex w-full max-w-7xl">
        {/* Left side (empty but responsive) */}
        <div className="flex-1 hidden md:block"></div>

        {/* Right side widgets */}
        <div className="flex flex-col gap-8 flex-1 max-w-5xl">
          <ProfileWidget />
          <GalleryWidget />
        </div>
      </div>
    </div>
  )
}
