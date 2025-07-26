import Image from 'next/image'
import Marquee from "react-fast-marquee"

const clients = [
  { name: '12v', logo: '/clients/12v.webp' },
  { name: 'UNICEF', logo: '/clients/unicef.webp' },
  { name: 'ssb', logo: '/clients/ssb.webp' },
  { name: 'chips', logo: '/clients/chips.webp' },
  { name: 'isro', logo: '/clients/isro.webp' },
  { name: 'fgk', logo: '/clients/fgk.webp' },
  { name: 'iim', logo: '/clients/iim.webp' },
  { name: 'jak', logo: '/clients/jak.webp' },
  { name: 'japit', logo: '/clients/japit.webp' },
  { name: 'Softage', logo: '/clients/softage.webp' },
  { name: 'Tourism', logo: '/clients/tourism.webp' },
  { name: 'Jharkhand Government', logo: '/clients/jh-gov.webp' },
  { name: 'CISF', logo: '/clients/cisf.webp' },
  { name: 'nepa', logo: '/clients/nepa.webp' },
  { name: 'mrb', logo: '/clients/mrb.webp' },
]

const clients1 = [
  { name: 'aims', logo: '/clients/aims.webp' },
  { name: 'bitsphere', logo: '/clients/bitsphere.webp' },
  { name: 'bluerix', logo: '/clients/bluerix.webp' },
  { name: 'br', logo: '/clients/br.webp' },
  { name: 'cwc', logo: '/clients/cwc.webp' },
  { name: 'cybrotech', logo: '/clients/cybrotech.webp' },
  { name: 'dgqa', logo: '/clients/dgqa.webp' },
  { name: 'dit', logo: '/clients/dit.webp' },
  { name: 'edique', logo: '/clients/edique.webp' },
  { name: 'ellaquai', logo: '/clients/ellaquai.webp' },
  { name: 'gcd', logo: '/clients/gcd.webp' },
  { name: 'holcruit', logo: '/clients/holcruit.webp' },
  { name: 'icg', logo: '/clients/icg.webp' },
  { name: 'jkbote', logo: '/clients/jkbote.webp' },
]

const clients2 = [
  { name: 'mahanagar', logo: '/clients/mahanagar.webp' },
  { name: 'mhaf', logo: '/clients/mhaf.webp' },
  { name: 'msme', logo: '/clients/msme.webp' },
  { name: 'nsbm', logo: '/clients/nsbm.webp' },
  { name: 'ogb', logo: '/clients/ogb.webp' },
  { name: 'pahalgam', logo: '/clients/pahalgam.webp' },
  { name: 'sipl', logo: '/clients/sipl.webp' },
  { name: 'sonet', logo: '/clients/sonet.webp' },
  { name: 'spj', logo: '/clients/spj.webp' },
  { name: 'sqae', logo: '/clients/sqae.webp' },
  { name: 'ssnsbm', logo: '/clients/ssnsbm.webp' },
  { name: 'tariif', logo: '/clients/tariif.webp' },
  { name: 'trai', logo: '/clients/trai.webp' },
  { name: 'UKPSC', logo: '/clients/UKPSC.webp' },
  { name: 'vn', logo: '/clients/vn.webp' },
]

export function ClientLogos() {
  return (
    <section id="clients" className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold leading-8 text-gray-900 dark:text-white mb-16">
          Trusted by industry-leading companies worldwide
        </h2>
        {[clients, clients1, clients2].map((clientSet, index) => (
          <Marquee key={index} speed={50} gradient={false} pauseOnHover>
            {clientSet.map((client) => (
              <div 
                key={client.name} 
                className="flex justify-center items-center hover:scale-105 transition-transform duration-300 p-4"
              >
                <div className="relative w-[160px] h-[90px] bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 mx-4">
                  <Image
                    className="object-contain"
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    sizes="(max-width: 800px) 100px, (max-width: 1200px) 140px, 160px"
                    quality={80}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}


// import Image from 'next/image'
// import Marquee from "react-fast-marquee"

// const clients = [
//   { name: '12v', logo: '/clients/12v.webp' },
//   { name: 'UNICEF', logo: '/clients/unicef.webp' },
//   { name: 'ssb', logo: '/clients/ssb.webp' },
//   { name: 'chips', logo: '/clients/chips.webp' },
//   { name: 'isro', logo: '/clients/isro.webp' },
//   { name: 'fgk', logo: '/clients/fgk.webp' },
//   { name: 'iim', logo: '/clients/iim.webp' },
//   { name: 'jak', logo: '/clients/jak.webp' },
//   { name: 'japit', logo: '/clients/japit.webp' },
//   { name: 'Softage', logo: '/clients/softage.webp' },
//   { name: 'Tourism', logo: '/clients/tourism.webp' },
//   { name: 'Jharkhand Government', logo: '/clients/jh-gov.webp' },
//   { name: 'CISF', logo: '/clients/cisf.webp' },
//   { name: 'nepa', logo: '/clients/nepa.webp' },
//   { name: 'mrb', logo: '/clients/mrb.webp' },
// ]

// export function ClientLogos() {
//   return (
//     <section id="clients" className="py-16 bg-gray-50 dark:bg-zinc-900">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <h2 className="text-center text-2xl font-semibold leading-8 text-gray-900 dark:text-white mb-16">
//           Trusted by industry-leading companies worldwide
//         </h2>
//         <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-12 gap-y-16 sm:max-w-xl sm:grid-cols-3 sm:gap-x-16 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:gap-x-20 lg:gap-y-20">
//           {clients.map((client) => (
//             <div 
//               key={client.name} 
//               className="flex justify-center items-center hover:scale-105 transition-transform duration-300 p-4"
//             >
//               <div className="relative w-[160px] h-[90px] bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4">
//                 <Image
//                   className="object-contain"
//                   src={client.logo}
//                   alt={`${client.name} logo`}
//                   fill
//                   sizes="(max-width: 600px) 100px, (max-width: 1200px) 140px, 160px"
//                   quality={80} // Compresses image while maintaining quality
//                   loading="lazy" // Ensures better performance
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
