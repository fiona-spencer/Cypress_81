import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from "react-icons/hi";
import cityT from '../assets/pages_images/city_image.svg';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Welcome Section */}
      <div className="flex flex-col gap-6 p-2 px-3 max-w-6xl m-6">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
          City of Toronto Service Report Application
        </h1>
        <p className="text-gray-500 text-md sm:text-lg md:text-xl lg:text-2xl">
          Welcome to the City of Toronto Service Report Application. You can view city reports or fill out a new service report via the map or department forms.
        </p>
      </div>

      {/* City Image */}
      <div className="relative w-full h-72 overflow-hidden">
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
            to="/about"
            className="text-teal-500 font-bold hover:underline text-lg"
          >
            View Map
          </Link>
        </div>
      </div>

      {/* Form and Map Sections */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        <h2 className="text-2xl font-semibold text-center">
          Fill Out A Report Using The Department Report Forms Or The City Map
        </h2>

        <div className="flex gap-8 justify-center m-2">
          {/* Report Page Section */}
          <div className="flex-1 bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="text-xl font-semibold text-center dark:text-gray-700">Report Form</div>
            <div className="text-center mt-4">
              <Link
                to="/projects"
                className="flex px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              >
                Go to Report Page <HiOutlineArrowRight className="ml-2 h-5 w-5" />
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
                to="/about"
                className="flex px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              >
                Go to Map Page <HiOutlineArrowRight className="ml-2 h-5 w-5" />
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

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Reports</h2>
            <div className="flex flex-wrap gap-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              Search All Reports
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
