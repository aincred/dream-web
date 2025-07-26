"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const WhatsAppButton = () => {
  const phoneNumber = "+916200307435"
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#e53a20] hover:bg-[#ff6b4a] text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={24} />
    </motion.a>
  )
}

export default WhatsAppButton

