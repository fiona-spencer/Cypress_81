import { Link } from 'react-router-dom';
import { useState } from 'react';
import CallToAction from '../components/CallToAction';
import cityT from '../assets/pages_images/city_image.svg'

export default function Home() {
  return (
    <div className=''>
      {/* Welcome Section */}
      <div className="flex flex-col gap-6 p-2 px-3 max-w-6xl m-6">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
          City of Toronto Service Report Application
        </h1>
        <p className="text-gray-500 text-md sm:text-lg md:text-xl lg:text-2xl">
          Welcome to the City of Toronto Service Report Application. You can view city reports or fill out a new service report via the map or department forms.
        </p>
      </div>
      <div className="relative w-full h-72 overflow-hidden">
        {/* Image */}
        <img
          src={cityT}
          alt="city_image"
          className="w-full h-full object-cover object-[10%_85%] transform scale-[200%] transition-all duration-500 ease-in-out"
        />
      </div>

      {/* View Reports Section */}
      <div className="p-3 bg-amber-200 dark:bg-slate-700">
        <h2 className="text-2xl font-semibold text-center">City of Toronto Reported Issues</h2>
        <div className="text-center">
          <Link
            to="/reports"
            className="text-teal-500 font-bold hover:underline text-lg"
          >
            View Map
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
  <h2 className="text-2xl font-semibold text-center">
    Fill Out a Report using the department report forms or the map
  </h2>
        {/* Flex container for report page and map page sections */}
        <div className="flex gap-8 justify-center m-2">
          {/* Report Page Section */}
          <div className="flex-1 bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="text-xl font-semibold text-center dark:text-gray-700">Report Form</div>
            <div className="text-center mt-4">
              <Link
                to="/report-form"
                className="inline-block px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600"
              >
                Go to Report Page
              </Link>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-600 p-5">
              <ul className="list-disc text-left text-lg">
                <li>Full Name</li>
                <li>Department</li>
                <li>Location</li>
                <li>Upload an Image</li>
                <li>Detailed Description of Issue or Event</li>
              </ul>
            </div>
          </div>

          {/* Map Page Section */}
          <div className="flex-1 bg-gray-300 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-center dark:text-gray-700">How to Use the Map</h3>
            <div className="text-center mt-4">
              <Link
                to="/map"
                className="inline-block px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600"
              >
                Go to Map Page
              </Link>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600 p-5">
              <ul className="list-disc text-left mx-auto max-w-lg text-lg">
                <li>Search Report at the top or filter based on:</li>
                <ul className="list-inside pl-6">
                  <li>Location</li>
                  <li>Department</li>
                </ul>
                <li>Click on the map to add a report</li>
                <li>Enter required information and submit</li>
                <li>Create an account and sign in to create a report</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
