import React from 'react'

const Layout = ({ title, description, className, children }) => {
  return (
    <div>
      <section class="bg-gray-200 text-black py-24">
        {/* <div class="container mx-auto text-center"> */}
        <div class="container mx-auto">
          <h1 class="text-4xl font-bold">{title}</h1>
          <p class="mt-4 text-lg">{description}</p>
        </div>
      </section>
      <div className={className}>{children}</div>
    </div>
  )
}

export default Layout;
