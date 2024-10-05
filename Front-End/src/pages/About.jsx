import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className=" sm:mt-40 text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w=full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Mophix Concept, we are passionate about redefining men’s fashion.
            Our journey began with a vision to provide stylish, high-quality
            suits and accessories that empower men to express their
            individuality and confidence. Each piece is carefully selected to
            blend timeless elegance with contemporary trends.
          </p>
          <p>
            We understand that every detail matters. From the finest fabrics to
            the perfect fit, our commitment to excellence is evident in every
            product we offer. Our goal is to create a seamless shopping
            experience that allows you to discover pieces that not only look
            great but also make you feel great.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to provide exceptional quality and style that caters
            to the modern man. We strive to make every customer feel valued and
            ensure that our products exceed expectations. Join us as we
            celebrate sophistication and individuality in men's fashion!
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We prioritize top-notch quality in every project we undertake. Our
            team of experts rigorously tests each product to ensure it meets the
            highest standards and exceeds customer expectations. Quality is not
            just a goal; it's a promise.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Our services are designed with your convenience in mind. We
            streamline every step, from initial consultation to final delivery,
            to provide a hassle-free experience. Enjoy seamless integration and
            support tailored to your needs.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We believe in building long-lasting relationships with our clients
            by offering exceptional customer service. Our dedicated support team
            is available around the clock to address your concerns and provide
            solutions promptly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
