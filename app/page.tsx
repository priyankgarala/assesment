import ProfileWidget from "@/components/profile-widget"
import GalleryWidget from "@/components/gallery-widget"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left half - empty (responsive) */}
        <div className="hidden lg:block lg:w-1/2" />

        {/* Right half - widgets */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <ProfileWidget />
          <GalleryWidget />
        </div>
      </div>
    </div>
  )
}
