import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import aboutimage from "../assets/about.jpg";
import tomimage from "../assets/tom.png";
import emmaimage from "../assets/emma.png";
import willimage from "../assets/will.png";
import BottomComp from "./../components/HomePageComp/BottomComp/BottomComp";

const About = () => {
  // Stats Box Component
  const StatBox = ({ title, subtitle }) => (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-red-500">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );

  // Team Member Component
  const TeamMember = ({ name, role, img }) => (
    <div className="text-center">
      <img
        src={img}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full mb-4"
      />
      <h4 className="text-lg font-bold">{name}</h4>
      <p className="text-gray-500">{role}</p>
      <div className="flex justify-center space-x-4 mt-2 text-gray-600">
        <FaInstagram />
        <FaTwitter />
        <FaLinkedin />
      </div>
    </div>
  );

  return (
    <>
      <div className="font-sans lg:mx-24">
        {/* Our Story Section */}
        <section className="px-6 py-12">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            Our Story
          </h2>
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <p className="text-lg text-gray-600">
                Launched in 2015, Exclusive is South Asia’s premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data, and
                services solutions, Exclusive has 10,500 sellers and 300 brands
                and serves 3 million customers across the region.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Exclusive has more than 1 million products to offer, growing at
                a very fast rate. Exclusive offers a diverse assortment in
                categories ranging from consumer.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={aboutimage}
                alt="Shopping"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatBox title="10.5k" subtitle="Sellers active on our site" />
            <StatBox title="33k" subtitle="Monthly Product Sale" />
            <StatBox title="45.5k" subtitle="Customers active on our site" />
            <StatBox title="25k" subtitle="Annual gross sale" />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <TeamMember
              name="Tom Cruise"
              role="Founder & Chairman"
              img={tomimage}
            />
            <TeamMember
              name="Emma Watson"
              role="Managing Director"
              img={emmaimage}
            />
            <TeamMember
              name="Will Smith"
              role="Product Designer"
              img={willimage}
            />
          </div>
        </section>
      </div>
      <BottomComp />
    </>
  );
};

export default About;
