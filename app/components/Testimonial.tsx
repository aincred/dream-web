import Image from 'next/image'

interface TestimonialProps {
  content: string
  name: string
  role: string
  company: string
  imageUrl: string
}

export function Testimonial({ content, name, role, company, imageUrl }: TestimonialProps) {
  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-md">
      <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{content}"</p>
      <div className="flex items-center">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
        </div>
      </div>
    </div>
  )
}

