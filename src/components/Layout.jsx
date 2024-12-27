import React from 'react'

const Layout = ({ title, description, className, children }) => {
  return (
    <div>
      <section class="bg-gray-200 text-black py-24">
        {/* <div class="container mx-auto text-center"> */}
        <div class="container mx-auto">
          <h1 class="text-4xl font-bold">{title}</h1>
          <p class="mt-4 text-lg">{description}</p>
          {/* <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            En savoir plus
          </button> */}
        </div>
      </section>
      <div className={className}>{children}</div>
    </div>
  )
}

export default Layout;
