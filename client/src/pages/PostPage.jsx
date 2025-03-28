import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { FaFireExtinguisher, FaTaxi, FaPlug, FaSkullCrossbones, FaDog, FaBuilding, FaTree, FaRegTrashAlt, FaWater, FaLandmark, FaBug, FaSnowflake } from 'react-icons/fa';

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

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>

      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' size='lg'>
          {getCategoryIcon(post?.category)}
          &nbsp; 
          {post && post.category}
        </Button>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      
      {/* Display the new formData fields */}
      <div className='p-3 max-w-2xl mx-auto'>
        <h3 className="text-lg font-semibold">Details:</h3>
        <p><strong>Full Name:</strong> {post?.fullName}</p>
        <p><strong>Email:</strong> {post?.email}</p>
        <p><strong>Phone Number:</strong> {post?.phoneNumber}</p>
        <p><strong>Severity (1-10):</strong> {post?.severity}</p>
        <p><strong>Location:</strong> {post?.location}</p>
        <p><strong>Date of Incident:</strong> {new Date(post?.dateOfIncident).toLocaleDateString()}</p>
      </div>

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>

      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
