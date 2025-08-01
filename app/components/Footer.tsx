"use client"

import Link from "next/link"
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from "lucide-react"
import { usePathname } from "next/navigation"
import { scrollToSection } from "@/app/utils/scrollToSection"

const Footer = () => {
  const pathname = usePathname()

  const handleClientClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      // If we're on home page, just scroll
      scrollToSection('clients')
    } else {
      // If we're on another page, navigate to home and then scroll
      window.location.href = '/#clients'
    }
  }

  return (
    <footer className="bg-gray-100 mt-8 dark:bg-zinc-950">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              Dreamworks Infotech is a premier IT consulting firm delivering cutting-edge digital solutions since 2009.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#e53a20]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-[#e53a20]">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#clients"
                  onClick={handleClientClick}
                  className="text-gray-600 hover:text-[#e53a20]"
                >
                  Clients
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#e53a20]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#e53a20]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-600 hover:text-[#e53a20]">
                  Career
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/" className="text-gray-600 hover:text-[#e53a20]">
                Governance, Risk & Compliance
                </Link>
              </li>
              <li>
                <Link href="/services/" className="text-gray-600 hover:text-[#e53a20]">
                Vulnerability Assessment & Penetration Testing
                </Link>
              </li>
              <li>
                <Link href="/services/" className="text-gray-600 hover:text-[#e53a20]">
                Cloud Security Assessments
                </Link>
              </li>
              <li>
                <Link href="/services/" className="text-gray-600 hover:text-[#e53a20]">
                Other Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">277 K-5, Kanke, Ranchi, Jharkhand, India 834008</p>
            <p className="text-gray-600 mb-2">+(651)310 0515</p>
            <p className="text-gray-600 mb-4">support[at]dwinfotech[dot]in</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Dreamworks-Infotech-Pvt-Ltd/100054681223435/#" className="text-gray-600 hover:text-[#e53a20]">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/dreamworks-infotech-private-limited/" className="text-gray-600 hover:text-[#e53a20]">
                <LinkedIn size={20} />
              </a>
              <a href="https://www.instagram.com/dreamworksinfotechrnc/" className="text-gray-600 hover:text-[#e53a20]">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2023 Dreamworks Infotech. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link 
              href="/privacy-policy" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 hover:text-[#e53a20] text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

