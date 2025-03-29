import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';

// Marker-related imports
import CreateMarker from './components/CreateMarker';  // Component for creating a marker
import UserMarkers from './components/UserMarkers';    // Component to view markers created by the logged-in user
import DepartmentMarkers from './components/DepartmentMarkers'; // Component to view markers by department

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* General Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />

        {/* Private Routes (user authentication required) */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          
          {/* Marker Routes (only accessible for logged-in users) */}
          <Route path='/create-marker' element={<CreateMarker />} />  {/* Route for creating markers */}
          <Route path='/user-markers' element={<UserMarkers />} />    {/* Route for viewing user markers */}
          <Route path='/department-markers/:department' element={<DepartmentMarkers />} /> {/* Route for markers by department */}
        </Route>

        {/* Admin Routes (only accessible for admin users) */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        {/* Other Routes */}
        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
