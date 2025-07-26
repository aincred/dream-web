import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface Service {
  title: string
  link: string
  icon: LucideIcon
}

interface ServiceCategoryProps {
  title: string
  services: Service[]
  icon: LucideIcon
}

export function ServiceCategory({ title, services, icon: CategoryIcon }: ServiceCategoryProps) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        {/* <CategoryIcon className="w-8 h-8 text-red-600 dark:text-red-400" /> */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <ul className="space-y-3">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <li key={index}>
              <Link
                href={service.link}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400  transition-colors duration-200"
              >
                <Icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span>{service.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

