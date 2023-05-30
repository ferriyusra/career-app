import React from 'react'

export default function SectionLandingHero() {
  return (
    <div className="bg-img font-noto md:pt-20 pt-12 pb-16 px-4 mx-auto max-w-screen-2xl lg:px-32">
      <div className="text-center">
        <div className="md:mb-52 mb-12">
          <div className="headline text-dark-3 font-medium font-montserrat text-4xl lg:text-5xl lg:leading-tight text-center">
            The free way to find the world’s
            <br className="hidden md:block" />
            best remote talent
          </div>
          <div className="mt-6 mb-14">
            <p className="text-grey-1 text-xl text-center leading-7">
              GetShayna is a 100% free resource for companies
              <br className="hidden md:block" />
              looking to find remote talent across the globe. No
              <br className="hidden md:block" />
              fees, no markups, no middlemen.
            </p>
          </div>
          <div className="inline-block py-5 px-8 rounded-full bg-purple-1 btn-fill transition-all duration-300">
            <a href="#" className="">
              <span className="text-white text-center text-xl">
                Join ReadyTal
              </span>
            </a>
          </div>
        </div>
      </div>
      <div>
        <p className="text-dark-2 text-center font-semibold mb-6">
          Over 1,500+ trusted partner around the world
        </p>
        <div className="font-montserrat flex md:flex-row flex-wrap justify-center lg:space-x-16 space-x-0 lg:gap-0 gap-4">
          <p className="text-dark-2 font-semibold text-2xl text-center">
            smartoro
          </p>
          <p className="text-dark-2 font-semibold text-2xl text-center">
            geoapp
          </p>
          <p className="text-dark-2 font-semibold text-2xl text-center">
            cesis
          </p>
          <p className="text-dark-2 font-semibold text-2xl text-center">
            adelfox
          </p>
          <p className="text-dark-2 font-semibold text-2xl text-center">
            rainbow
          </p>
          <p className="text-dark-2 font-semibold text-2xl text-center">
            simbadda
          </p>
        </div>
      </div>
    </div>
  )
}