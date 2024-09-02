import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            maxime alias laborum, eius sequi quas neque inventore sint
            excepturi, officia reprehenderit animi asperiores, ab consectetur
            cumque pariatur consequuntur magni accusamus?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
            quibusdam similique nobis beatae animi unde inventore, optio qui
            odio nostrum, deleniti magnam. Commodi praesentium, aliquam ea quam
            recusandae hic numquam!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam veniam
            fuga totam voluptatem, quisquam eius laboriosam voluptatibus facilis
            blanditiis sint nulla doloremque aliquid ratione! Dolorem aliquam
            recusandae quo veritatis obcaecati.
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
