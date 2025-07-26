import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'
import { AuthProvider } from "./context/AuthContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dreamworks Infotech - Cybersecurity & IT Solutions',
  description: 'Dreamworks Infotech is a premier Information Technology consulting firm delivering cutting-edge digital solutions and cybersecurity services since 2009.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="DreamWorks Infotech" />
        <meta name="description" content="Dreamworks Infotech offers comprehensive IT solutions to protect, optimize, and grow your business. Advanced Security: Our cutting-edge security solutions protect your digital assets from evolving threats. Custom Software: We develop tailored software solutions to meet your unique business needs. IT Optimization: Enhance your IT infrastructure for improved performance and efficiency." />
        <meta name="keywords" content="Dreamworks Infotech, IT solutions, business protection, cybersecurity, advanced security, digital asset protection, security solutions, IT security, custom software, software development, tailored software solutions, business software, IT optimization, IT infrastructure, performance optimization, efficiency improvement" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="author" content="Ankit Kumar" />
        <meta name="language" content="English" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen dark:bg-black`}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

