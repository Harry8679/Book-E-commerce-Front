import React from 'react';

const Layout = ({ title, description, className, children }) => {
  return (
    <div>
      <section className="bg-gray-200 text-gray-800 py-10 mx-auto text-center">
        {/* <div class="container mx-auto text-center"> */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-4 text-lg">{description}</p>
        </div>
      </section>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
