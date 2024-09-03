import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className=" sm:mt-40 text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Contact image"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Stores</p>
          <div className="text-gray-500">
            <p>
              SHOP 11, FIRST FLOOR, SAHAD PLAZA, BESIDE ACCESS BANK, <br />
              WUSE MARKET, ABUJA.
            </p>
            <br />
            <p>OR</p>
            <br />
            <p>SHOP FBE 12,FIRST FLOOR, NEW BANEX PLAZA, WUSE 2 ABUJA.</p>
          </div>
          <p className="text-gray-500">
            Phone:+234 818 765 7654 <br />
            Email:Info@mophixconcept.com
          </p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
