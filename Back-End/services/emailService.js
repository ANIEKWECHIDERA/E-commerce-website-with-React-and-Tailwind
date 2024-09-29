"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const formatPrice = (amount) => {
  return new Intl.NumberFormat().format(amount);
};

const sendMail = (recipient, orderDetails, deliveryAddress) => {
  const deliveryFee = 5000; // Define your delivery fee here
  const totalAmount =
    orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    deliveryFee;
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to: recipient, // Customer's email
    subject: "Order Confirmation",
    html: `
<div style="font-family: Arial, sans-serif; color: #333">
      <div
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        "
      >
        <h1 style="color: #000000; text-align: center">
          Thank You for Shopping with MophixConcept!
        </h1>
        <p style="font-size: 18px; text-align: center">
          Hello, <br />
          We're thrilled to have you as a customer and hope you love your new
          purchase!
        </p>

        <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0" />

        <h2 style="color: #333; text-align: center">Order Summary</h2>
        <ul style="list-style: none; padding: 0">
          ${orderDetails
            .map(
              (item) => `
          <li
            style="
              font-size: 16px;
              margin-bottom: 10px;
              border-bottom: 1px solid #f2f2f2;
              padding-bottom: 10px;
            "
          >
            <strong>${item.name}</strong> (x${item.quantity})
            <span style="float: right">₦${formatPrice(item.price)}</span>
          </li>
          `
            )
            .join("")}
        </ul>

        <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0" />

        <p style="font-size: 18px">
          <strong>Delivery Address:</strong> <br />
          ${deliveryAddress}
        </p>

        <h3 style="text-align: center">Total Paid: ₦${formatPrice(
          totalAmount
        )}</h3>

        <p style="font-size: 16px; text-align: center; margin-top: 30px">
          <strong>We hope to see you again soon!</strong>
        </p>

        <p style="text-align: center; margin-top: 30px">
          <a
            href="https://mophixconcept.com"
            style="
              background-color: #000000;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            "
            >Shop Again</a
          >
        </p>

        <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0" />

        <p style="font-size: 14px; text-align: center; color: #999">
          If you have any questions about your order, feel free to
          <a href="mailto:support@mophixconcept.com" style="color: #000000">contact us</a>.
        </p>

        <p style="font-size: 14px; text-align: center; color: #999">
          Follow us on
          <a href="https://www.instagram.com/mophixconcept" style="color: #c70972">Instagram</a>
          for the latest trends and updates!
        </p>
      </div>
    </div>
`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    //console.log("Email sent: " + info.response);
  });
};

module.exports = sendMail;
