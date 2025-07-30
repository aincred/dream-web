"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ReCaptcha from "../components/ReCaptcha"

export default function Contact() {
  const [formData, setFormData] = useState({
    "entry.548481978": "",
    "entry.12387323": "",
    "entry.164714104": "",
    "entry.1055894757": ""
  })
  const [captchaToken, setCaptchaToken] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!captchaToken) {
      alert("Please complete the captcha")
      return
    }

    const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSesqgt3waTPxnRWgh-hc7rEjlvmuzwpN7UxWwwsaJjJt5g9Jw/formResponse"
    const formDataEncoded = new URLSearchParams({
      ...formData,
      "g-recaptcha-response": captchaToken,
    })

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataEncoded.toString(),
      })
      alert("Form submitted successfully!")
      setFormData({
        "entry.548481978": "",
        "entry.12387323": "",
        "entry.164714104": "",
        "entry.1055894757": ""
      })
      setCaptchaToken("")
      window.grecaptcha.reset()
    } catch (error) {
      alert("Error submitting form. Please try again.")
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          We'd love to hear from you. Please fill out this form or use our contact information below.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="entry.548481978"
                  value={formData["entry.548481978"]}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                  className="w-full dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="entry.1055894757"
                  value={formData["entry.1055894757"]}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit phone number"
                  className="w-full dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="entry.12387323"
                  placeholder="Enter email"
                  value={formData["entry.12387323"]}
                  onChange={handleChange}
                  required
                  className="w-full dark:bg-gray-800 dark:text-white"
                />
              </div>
             
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="entry.164714104"
                  value={formData["entry.164714104"]}
                  onChange={handleChange}
                  required
                  className="w-full h-32 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <ReCaptcha 
                sitekey="6LeGCZQrAAAAAKCUCWh16aMzKGXgvPFmQQAuBSEt" 
                onChange={(token) => setCaptchaToken(token)} 
              />
              <Button  type="submit" className="w-full  bg-red-600">
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[#e53a20] mr-4 mt-1" />
                <p className="text-gray-600 dark:text-gray-300">277 K-5, Kanke, Ranchi, Jharkhand, India 834008</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-[#e53a20] mr-4" />
                <p className="text-gray-600 dark:text-gray-300">+(651)310 0515</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-[#e53a20] mr-4" />
                <p className="text-gray-600 dark:text-gray-300">support@dwinfotech.in</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Office Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#e53a20] mr-3" />
                <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#e53a20] mr-3" />
                <p className="text-gray-600 dark:text-gray-300">Saturday: 10:00 AM - 2:00 PM</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#e53a20] mr-3" />
                <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.4478989058434!2d85.31070377517659!3d23.408182178905314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e72aaf34bfb1%3A0xc4c9815d11c6086b!2sDreamworks%20Infotech%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1739949892837!5m2!1sen!2sin"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

