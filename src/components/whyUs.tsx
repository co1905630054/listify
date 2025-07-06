import { FaStar, FaRocket, FaBriefcase, FaUserTie, FaHandsHelping, FaCheckCircle } from 'react-icons/fa'

const WhyUs = () => (
    <section className="p-6 border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
   <h2 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight text-center">
      Why Choose <span className="text-blue-600">Ingenious Digital World</span>?
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
      We’re not just another affiliate hub. We bring you real, tested, and impactful tools with your success in mind.
    </p>


    {/* Value Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
      {[
        {
          icon: <FaRocket className="mx-auto text-blue-600 text-3xl mb-2" />,
          title: 'Launch Value-Based Tools',
        },
        {
          icon: <FaHandsHelping className="mx-auto text-yellow-600 text-3xl mb-2" />,
          title: 'Build Trust in Affiliate Space',
        },
        {
          icon: <FaUserTie className="mx-auto text-green-600 text-3xl mb-2" />,
          title: 'Share Honest Reviews',
        },
        {
          icon: <FaCheckCircle className="mx-auto text-purple-600 text-3xl mb-2" />,
          title: 'Create Real Impact',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          {item.icon}
          <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
        </div>
      ))}
    </div>
  </section>
)

export default WhyUs
