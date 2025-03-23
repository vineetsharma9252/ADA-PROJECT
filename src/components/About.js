import React from "react";
import { Building2, Globe2, Landmark, Users, ShieldCheck, Leaf, Home, Briefcase, MessageSquareQuote } from "lucide-react";
import Footer from './Footer';
import FAQ from "./FAQ" ;

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-bold text-center text-[#4b0082] uppercase tracking-wide">About Ajmer Development Authority</h1>
        <p className="text-left text-gray-700 mt-4 max-w-3xl mx-auto">
          The Ajmer Development Authority (ADA) is dedicated to planned and sustainable urban development, enhancing the quality of life for residents and preserving Ajmer’s rich cultural heritage.
        </p>
      </section>

      {/* Objectives Section */}
      <section>
        <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2">Our Objectives</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {objectives.map((item, index) => (
            <div key={index} className="p-5 shadow-md border-l-4 border-ascent-700 hover:bg-gray-100 transition-all h-full">
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission Section */}
        <section className="space-y-10">
          <div>
            <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2 tracking-wider">Our Vision</h2>
            <p className="mt-4 text-left text-gray-700 leading-relaxed">
          To create a vibrant, sustainable, and inclusive Ajmer that harmoniously integrates urban development, heritage conservation, and environmental stewardship, enhancing the quality of life for all residents.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2 tracking-wider">Our Mission</h2>
            <p className="mt-4 text-left text-gray-700 leading-relaxed">
          To promote and manage planned urban development in Ajmer through efficient infrastructure, affordable housing, and community facilities, ensuring active participation from residents, safeguarding environmental resources, and preserving the city’s cultural heritage.
            </p>
          </div>
        </section>

        {/* Commissioners Note */}
      <section>
        <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2">Our Administration</h2>
        <p className="mt-4 text-left text-gray-700 leading-relaxed">
          The Commissioner or Chief Executive Officer (CEO) of the Ajmer Development Authority oversees all administrative and developmental activities. For the latest updates on commissioners and administrative heads, please visit our official portal.
        </p>
      </section>
      <FAQ/>
    </div>
  );
};

const objectives = [
  {
    title: "Urban Planning & Development",
    description: "Prepare and implement comprehensive plans ensuring orderly and sustainable urban growth.",
    icon: <Globe2 size={36} className="text-green-800" />,
  },
  {
    title: "Infrastructure Development",
    description: "Enhancing essential infrastructure like roads, drainage, and sanitation for improved living standards.",
    icon: <Building2 size={36} className="text-green-800" />,
  },
  {
    title: "Affordable Housing",
    description: "Promote housing projects to meet growing population needs and provide diverse living options.",
    icon: <Home size={36} className="text-green-800" />,
  },
  {
    title: "Environmental Sustainability",
    description: "Ensure eco-friendly development preserving natural resources and promoting green spaces.",
    icon: <Leaf size={36} className="text-green-800" />,
  },
  {
    title: "Community Services",
    description: "Development of schools, hospitals, parks, and recreational areas for community well-being.",
    icon: <Users size={36} className="text-green-800" />,
  },
  {
    title: "Regulatory Compliance",
    description: "Enforce building regulations ensuring safety and compliance with planning laws.",
    icon: <ShieldCheck size={36} className="text-green-800" />,
  },
  {
    title: "Economic Growth",
    description: "Stimulate economy through industrial and commercial zone development attracting investments.",
    icon: <Briefcase size={36} className="text-green-800" />,
  },
  {
    title: "Public Participation",
    description: "Encourage citizen involvement via public consultations to align projects with community needs.",
    icon: <MessageSquareQuote size={36} className="text-green-800" />,
  },
  {
    title: "Heritage Conservation",
    description: "Protect and preserve Ajmer's rich cultural and historical sites promoting tourism.",
    icon: <Landmark size={36} className="text-green-800" />,
  },
];




export default AboutUsPage;
