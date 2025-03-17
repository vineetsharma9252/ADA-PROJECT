import React from "react";
import {
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  HardHat,
  Users,
  Leaf,
  Globe,
  Building,
  Home,
} from "lucide-react";
import project1_1 from "../assets/project1.jpg";
import project1_2 from "../assets/project1_2.jpg";
import project2_1 from "../assets/project2.jpg";
import project2_2 from "../assets/project2_1.jpg";

const ProjectPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl font-bold text-center text-green-800 uppercase tracking-wide">
          ADA Projects
        </h1>
        <p className="text-center text-gray-700 mt-4 max-w-3xl mx-auto">
          Explore the transformative projects undertaken by the Ajmer
          Development Authority (ADA) to enhance urban infrastructure, promote
          sustainability, and improve the quality of life for residents.
        </p>
      </section>

      {/* Key Projects Overview */}
      <section>
        <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2">
          Key Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {keyProjects.map((project, index) => (
            <div
              key={index}
              className="p-5 shadow-md border-l-4 border-ascent-700 hover:bg-gray-100 transition-all h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                {project.icon}
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
              <p className="text-gray-700">{project.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Details Section */}
      <section>
        <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2">
          Project Highlights
        </h2>
        <div className="mt-8 space-y-8">
          {projectHighlights.map((highlight, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-800">
                {highlight.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {highlight.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {highlight.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements and Impact Section */}
      <section>
        <h2 className="text-3xl font-semibold text-ascent-700 border-b-4 border-green-800 inline-block uppercase pb-2">
          Achievements & Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-5 shadow-md border-l-4 border-ascent-700 hover:bg-gray-100 transition-all h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                {achievement.icon}
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
              </div>
              <p className="text-gray-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

// Data for Key Projects
const keyProjects = [
  {
    title: "Smart City Initiative",
    description:
      "Developing smart infrastructure to enhance urban living through technology and innovation.",
    location: "Ajmer City",
    status: "Ongoing",
    icon: <Globe size={36} className="text-green-800" />,
  },
  {
    title: "Affordable Housing Scheme",
    description:
      "Providing affordable housing solutions to low-income families.",
    location: "Ajmer District",
    status: "Completed",
    icon: <Home size={36} className="text-green-800" />,
  },
  {
    title: "Green Energy Park",
    description:
      "Establishing a renewable energy park to promote sustainability.",
    location: "Pushkar",
    status: "Upcoming",
    icon: <Leaf size={36} className="text-green-800" />,
  },
];

// Data for Project Highlights
const projectHighlights = [
  {
    title: "Smart City Initiative",
    description:
      "The Smart City Initiative aims to transform Ajmer into a technologically advanced city with smart infrastructure, efficient public services, and enhanced quality of life for residents.",
    images: [project1_1, project1_2],
  },
  {
    title: "Affordable Housing Scheme",
    description:
      "This project focuses on providing affordable housing to low-income families, ensuring access to safe and secure living spaces.",
    images: [project2_1, project2_2],
  },
];

// Data for Achievements
const achievements = [
  {
    title: "100+ Projects Completed",
    description:
      "Successfully completed over 100 projects across various sectors.",
    icon: <CheckCircle size={36} className="text-green-800" />,
  },
  {
    title: "$500M Budget Utilized",
    description:
      "Effectively utilized a budget of $500 million for development projects.",
    icon: <HardHat size={36} className="text-green-800" />,
  },
  {
    title: "1M+ Beneficiaries",
    description:
      "Improved the lives of over 1 million residents through our initiatives.",
    icon: <Users size={36} className="text-green-800" />,
  },
];

export default ProjectPage;
