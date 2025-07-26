import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface CallToActionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function CallToAction({ title, description, buttonText, buttonLink }: CallToActionProps) {
  return (
    <div className="bg-gray-900 dark:bg-red-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-xl mb-8">{description}</p>
        <Button asChild size="lg" variant="secondary" className="bg-[#e53a20]  text-white hover:bg-[#e53a25] dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  )
}

