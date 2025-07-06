import { FaUserTie, FaCheckCircle, FaHandsHelping, FaRocket } from 'react-icons/fa'
import Image from 'next/image'

export default function About() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto relative">
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-8 text-gray-900 transition-all duration-500 hover:shadow-xl space-y-6">

        {/* Overlapping Logo */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/2.png" // ✅ Replace with actual logo path
            alt="Ingeneous Digital World Logo"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-xl bg-white p-2"
          />
        </div>

        {/* Header */}
        <div className="pt-16 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <FaUserTie className="text-blue-600 text-3xl" />
            <h2 className="text-3xl font-bold text-center">Meet Dhruv Madheshiya</h2>
          </div>
          <p className="text-sm text-blue-700 font-medium">INGENIOUS DIGITAL WORLD</p>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-4 text-base mt-4">
          <li className="flex items-start gap-3">
            <FaCheckCircle className="mt-1 text-green-500" />
            I share high-quality tools, training & resources for growing your online business.
          </li>
          <li className="flex items-start gap-3">
            <FaRocket className="mt-1 text-red-500" />
            My product choices are based on value and solving real problems — no hype, no fluff.
          </li>
          <li className="flex items-start gap-3">
            <FaHandsHelping className="mt-1 text-yellow-600" />
            I believe in honest marketing, clear communication, and building trust.
          </li>
        </ul>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10">
          <div>
            <p className="text-3xl font-bold text-blue-700">25+</p>
            <p className="text-sm text-gray-600">Tools I’m Researching</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-700">100+</p>
            <p className="text-sm text-gray-600">People Helped Soon</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-700">10+</p>
            <p className="text-sm text-gray-600">Products I Trust</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-700">5+</p>
            <p className="text-sm text-gray-600">Resources Coming</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://warriorplus.com/member/ingeniousworld11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 transition"
          >
            Connect on WarriorPlus
          </a>
        </div>
      </div>
    </section>
  )
}
