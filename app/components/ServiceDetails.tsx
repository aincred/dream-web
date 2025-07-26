import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceDetailsProps {
  title: string
  description: string
  link: string
}

export function ServiceDetails({ title, description, link }: ServiceDetailsProps) {
  return (
    <Link href={link} className="block">
   
        <h3 className="text-m  text-gray-900 hover:text-red-400 dark:text-white mb-2">- {title}</h3>
       
  
    </Link>
  )
}

