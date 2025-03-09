const AboutUs = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Header Section */}
        <header className="bg-blue-900 text-white py-6 text-center shadow-md">
          <h1 className="text-3xl font-bold">About Ajmer Development Authority</h1>
        </header>
  
        {/* Introduction Section */}
        <section className="max-w-5xl mx-auto mt-10 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">Who We Are?</h2>
          <p className="mt-4 text-gray-600">
            Ajmer Development Authority (ADA) is dedicated to the planned and sustainable development of Ajmer city, ensuring high-quality infrastructure and public amenities.
          </p>
        </section>
  
        {/* Vision & Mission */}
        <section className="max-w-5xl mx-auto mt-10 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Vision & Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-blue-700">Our Vision</h3>
              <p className="mt-2 text-gray-600">
                To transform Ajmer into a modern, smart, and eco-friendly city.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-blue-700">Our Mission</h3>
              <p className="mt-2 text-gray-600">
                Ensuring sustainable urban growth, better infrastructure, and smart city projects.
              </p>
            </div>
          </div>
        </section>
  
        {/* Projects Section */}
        <section className="max-w-5xl mx-auto mt-10 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Key Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="font-bold text-lg text-blue-700">Smart City Initiative</h3>
              <p className="text-gray-600 mt-2">Developing a digitally advanced city infrastructure.</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="font-bold text-lg text-blue-700">Housing Schemes</h3>
              <p className="text-gray-600 mt-2">Affordable housing projects for urban development.</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="font-bold text-lg text-blue-700">Green Initiatives</h3>
              <p className="text-gray-600 mt-2">Eco-friendly projects to improve sustainability.</p>
            </div>
          </div>
        </section>
  
        {/* Contact Us Section */}
        <section className="max-w-5xl mx-auto mt-10 px-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700">
              📍 **Office Address:** Ajmer Development Authority, XYZ Road, Ajmer - 305001
            </p>
            <p className="mt-2 text-gray-700">
              📞 **Phone:** +91 9876543210 | 📧 **Email:** info@adaajmer.gov.in
            </p>
          </div>
        </section>
      </div>
    );
  };
  
  export default AboutUs;
  