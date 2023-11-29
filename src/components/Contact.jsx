// import React from 'react';
import { Link } from "react-router-dom"; // Import Link if you're using React Router

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 h-[100vh] overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg">
        Have a question, suggestion, or just want to say hello? We'd love to
        hear from you!
      </p>
      <p className="text-lg mt-4">
        You can reach us through the following contact methods:
      </p>
      <ul className="list-disc pl-6 text-lg mt-4">
        <li>Email: example@example.com</li>
        <li>Phone: +1 (123) 456-7890</li>
        <li>Address: 1234 Recipe St, Foodville</li>
      </ul>
      <p className="text-lg mt-4">
        Our dedicated team is here to assist you, so don't hesitate to get in
        touch.
      </p>

      <div className="flex items-center justify-center mt-8">
        <Link to="/" className="text-blue-700 hover:underline">
          Go Back To The Homepage
        </Link>
      </div>
    </div>
  );
};

export default Contact;
