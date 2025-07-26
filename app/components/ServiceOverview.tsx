import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceProps {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  link: string
}

export function ServiceOverview({ title, description, icon: Icon, link }: ServiceProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="rounded-full  p-3 mb-4">
        <Icon className="w-8 h-8 text-[#e53a20]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <Button asChild variant="outline">
        <Link href={link} className="inline-flex items-center">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

