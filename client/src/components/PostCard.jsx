import { Link } from 'react-router-dom';
import { FaFireExtinguisher, FaTaxi, FaPlug, FaSkullCrossbones, FaDog, FaBuilding, FaTree, FaRegTrashAlt, FaWater, FaLandmark, FaBug, FaSnowflake } from 'react-icons/fa';

// Function to map category to an icon
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Emergency':
      return <FaFireExtinguisher />;
    case 'TTC':
      return <FaTaxi />;
    case 'Hydro':
      return <FaPlug />;
    case 'Poison Control':
      return <FaSkullCrossbones />;
    case 'Animal Services':
      return <FaDog />;
    case 'Building Permits':
      return <FaBuilding />;
    case 'Parks and Recreation':
      return <FaTree />;
    case 'Waste Collection':
      return <FaRegTrashAlt />;
    case 'Water Leaks':
      return <FaWater />;
    case 'Graffiti Removal':
      return <FaLandmark />;
    case 'Tree Maintenance':
      return <FaTree />;
    case 'Public Health':
      return <FaBug />;
    case 'Snow Removal':
      return <FaSnowflake />;
    default:
      return null;
  }
};

export default function PostCard({ post }) {
  return (
    <div className='flex w-full border-blue-800 hover:border-2 rounded-lg transition-all bg-blue-100'>
      {/* Left side: Icon and Text Content */}
      <div className='flex flex-col p-3 gap-2 w-3/4'>
          <div className=' items-center gap-2'>
            {/* Category Icon */}
            <span className='text-lg font-semibold line-clamp-2'>{post.title}</span>

            <div className='text-2xl text-blue-800 flex mt-2'>
              {getCategoryIcon(post.category)}
              <span className='italic text-lg mx-2'>{post.category}</span>
            </div>
          </div>

        <div className='text-sm text-gray-700'>
          <p><strong>Full Name:</strong> {post.fullName}</p>
          <p><strong>Email:</strong> {post.email}</p>
          <p><strong>Phone Number:</strong> {post.phoneNumber}</p>
          <p><strong>Severity (1-10):</strong> {post.severity}</p>
          <p><strong>Location:</strong> {post.location}</p>
          <p><strong>Date of Incident:</strong> {new Date(post.dateOfIncident).toLocaleDateString()}</p>
        </div>

        {/* View Report Button */}
        <Link
          to={`/post/${post.slug}`}
          className='mt-3 inline-block border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 px-4 rounded-md'
        >
          View Report
        </Link>
      </div>

      {/* Right side: Image */}
      <div className='w-1/3'>
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt='post cover'
            className='w-full h-full object-cover rounded-tr-lg rounded-br-lg'
          />
        </Link>
      </div>
    </div>
  );
}
