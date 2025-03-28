import { FaSkullCrossbones, FaFireExtinguisher, FaTaxi, FaPlug, FaDog, FaBuilding, FaTree, FaSnowflake, FaRegTrashAlt, FaLandmark, FaBug, FaWineBottle, FaWater } from 'react-icons/fa';
import CallToAction from '../components/CallToAction';


//Local images
import fire from '../assets/pages_images/fire_image.png'; 
import ttc from '../assets/pages_images/ttc_image.png'; 
import hydro from '../assets/pages_images/hydro_image.jpeg'; 
import poison from '../assets/pages_images/poison_image.jpeg'; 
import animal from '../assets/pages_images/animal_image.jpg'; 
import building from '../assets/pages_images/building_image.jpg'; 
import parks from '../assets/pages_images/park_image.jpg'; 
import garbage from '../assets/pages_images/garbage_image.jpg'; 
import water from '../assets/pages_images/water_image.jpg'; 
import graffiti from '../assets/pages_images/graffiti_image.jpg'; 
import tree from '../assets/pages_images/tree_image.jpg'; 
import health from '../assets/pages_images/health_image.png'; 
import snow from '../assets/pages_images/snow_image.jpg'; 

const emergencyContacts = [
  {
    title: 'Fire/Ambulance Emergency',
    phone: '911 (EMERGENCY)',
    imageUrl: fire,
    link: 'https://www.toronto.ca/services-payments/fire-emergency/',
    icon: <FaFireExtinguisher />
  },
  {
    title: 'TTC (Toronto Transit Commission)',
    phone: '416-393-4636',
    imageUrl: ttc,
    link: 'https://www.ttc.ca/',
    icon: <FaTaxi />
  },
  {
    title: 'Toronto Hydro (Power Outages)',
    phone: '416-542-8000',
    imageUrl: hydro,
    link: 'https://www.torontohydro.com/',
    icon: <FaPlug />
  },
  {
    title: 'Ontario Poison Centre',
    phone: '1-800-268-9017',
    imageUrl: poison,
    link: 'https://www.ontariopoisoncentre.ca/',
    icon: <FaSkullCrossbones />
  },
  {
    title: 'Toronto Animal Services (Animal Control and Wildlife)',
    phone: '416-338-7297',
    imageUrl: animal,
    link: 'https://www.toronto.ca/services-payments/animal-services/',
    icon: <FaDog />
  },
  {
    title: 'Toronto Building Permits (For Construction and Renovation Inquiries)',
    phone: '416-392-1000',
    imageUrl: building,
    link: 'https://www.toronto.ca/services-payments/building-permits/',
    icon: <FaBuilding />
  },
  {
    title: 'City of Toronto Parks and Recreation (Facility/Programs Inquiries)',
    phone: '416-338-4386',
    imageUrl: parks,
    link: 'https://www.toronto.ca/services-payments/parks-and-recreation/',
    icon: <FaLandmark />
  },
  {
    title: 'Waste Collection and Garbage Issues',
    phone: '416-338-2010',
    imageUrl: garbage,
    link: 'https://www.toronto.ca/services-payments/garbage-and-recycling/',
    icon: <FaRegTrashAlt />
  },
  {
    title: 'Water Main Breaks or Leaks',
    phone: '416-338-8888',
    imageUrl: water,
    link: 'https://www.toronto.ca/services-payments/water-main-breaks-and-leaks/',
    icon: <FaWater />
  },
  {
    title: 'Graffiti Removal',
    phone: '311 (Toronto City Services)',
    imageUrl: graffiti,
    link: 'https://www.toronto.ca/services-payments/graffiti-removal/',
    icon: <FaWineBottle />
  },
  {
    title: 'Tree Maintenance (Downed Trees/Branches)',
    phone: '311 (Toronto City Services)',
    imageUrl: tree,
    link: 'https://www.toronto.ca/services-payments/tree-maintenance/',
    icon: <FaTree />
  },
  {
    title: 'Public Health Concerns (Mosquitoes, Rodents)',
    phone: '416-338-7600',
    imageUrl: health,
    link: 'https://www.toronto.ca/services-payments/public-health-concerns/',
    icon: <FaBug />
  },
  {
    title: 'Snow Removal',
    phone: '311 (Toronto City Services)',
    imageUrl: snow,
    link: 'https://www.toronto.ca/services-payments/snow-removal/',
    icon: <FaSnowflake />
  },
];


export default function Projects() {
  return (
    <div className='min-h-screen max-w-screen-lg max-w-screen-4xl mx-auto flex justify-center items-center flex-col gap-12 p-12 bg-[#7a9ac191]'>
      <h1 className='text-5xl font-bold text-center text-[#005393]'>
        Report An Issue To A City of Toronto Department
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        If you are experiencing any issues or have a concern, feel free to contact the relevant department using the phone numbers listed below.
      </p>

      <div className='w-full'>
        {emergencyContacts.map((contact, index) => (
          <div key={index} className='bg-slate-50 shadow-lg rounded-lg mb-6 pb-10'>
            <div className='px-10 py-6'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-[#234966] text-left py-2 inline-flex items-center mb-2'>
                <span className='bg-blue-800 border-2 text-white rounded-lg p-3 mr-2'>{contact.icon}</span>
                  {contact.title}
              </h2>
            </div>
              <div className='flex flex-row items-center gap-6'>
                {/* Image on the left */}
                <img 
                  src={contact.imageUrl}
                  alt={contact.title}
                  className='w-40 h-40 object-cover rounded-[5px]'
                />

                {/* Content on the right, stacked vertically */}
                <div className='flex flex-col justify-between h-32 w-full pb-4'>
                  {/* Phone Number with Outline */}
                  <p className='flex items-center justify-center w-full bg-[#dfe7f8] h-12 border-2 border-[#005393] rounded-md text-xl text-[#005393] p-1.5 mb-4'>
                    Phone Number: &nbsp;
                    <a href={`tel:${contact.phone}`} className='text-[#005393] hover:text-[#00427d]'>{contact.phone}</a>
                  </p>

                  {/* Buttons (More Info and Make a Request) */}
                  <div className="flex flex-col gap-4">
                    <a 
                      href={contact.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className='items-center h-12 px-6 py-3 bg-[#b53232] text-white rounded-md text-center hover:bg-[#951f1f] transition-all'
                    >
                      <span className='mr-2 text-lg'>Report an Issue</span>
                    </a>
                    <a 
                      href={contact.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className='inline-block h-12 px-6 py-3 bg-[#005393] text-white rounded-md text-center hover:bg-[#00427d] transition-all'
                    >
                      More Info
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CallToAction />
    </div>
  );
}
