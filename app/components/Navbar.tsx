import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/services" className="text-white">Services</Link>
          <Link href="/certificate" className="text-white">Certificate</Link>
          <Link href="/about" className="text-white">About</Link>
          <Link href="/contact" className="text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
} 