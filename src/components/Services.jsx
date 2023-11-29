import React from "react";

const Services = () => {
  return (
    <div class="bg-gray-100 py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Our Services</h2>
        <p class="text-gray-600 mb-8">
          Choose the perfect plan for your recipe needs
        </p>

        <div class="flex justify-center space-x-8">
          {/* <!-- Service 1: Basic --> */}
          <div class="bg-white shadow-lg p-6 rounded-lg w-1/3">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Basic</h3>
            <p class="text-gray-600 mb-4">
              Start with our basic plan to get your recipes online.
            </p>
            <ul class="text-left text-gray-600">
              <li class="mb-2">Recipe Hosting</li>
              <li class="mb-2">Basic Support</li>
              <li class="mb-2">Limited Features</li>
            </ul>
            <p class="text-2xl font-bold text-gray-800 mt-4">$9.99/month</p>
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* <!-- Service 2: Normal --> */}
          <div class="bg-white shadow-lg p-6 rounded-lg w-1/3">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Normal</h3>
            <p class="text-gray-600 mb-4">
              Upgrade to our normal plan for more features and support.
            </p>
            <ul class="text-left text-gray-600">
              <li class="mb-2">Recipe Hosting</li>
              <li class="mb-2">Priority Support</li>
              <li class="mb-2">Advanced Features</li>
            </ul>
            <p class="text-2xl font-bold text-gray-800 mt-4">$19.99/month</p>
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* <!-- Service 3: Premium --> */}
          <div class="bg-white shadow-lg p-6 rounded-lg w-1/3">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Premium</h3>
            <p class="text-gray-600 mb-4">
              Unlock the full potential with our premium plan.
            </p>
            <ul class="text-left text-gray-600">
              <li class="mb-2">Recipe Hosting</li>
              <li class="mb-2">24/7 Premium Support</li>
              <li class="mb-2">Unlimited Features</li>
            </ul>
            <p class="text-2xl font-bold text-gray-800 mt-4">$29.99/month</p>
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
