import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaDumbbell, FaListAlt, FaUtensils, FaCog } from 'react-icons/fa';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuItems = [
    { title: 'Home', icon: <FaHome className="text-xl" />, path: '/' },
    { title: 'Programmi', icon: <FaListAlt className="text-xl" />, path: '/programmi' },
    { title: 'Impostazioni', icon: <FaCog className="text-xl" />, path: '/impostazioni' },
  ];

  // Handle window resize to detect mobile view
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`fixed top-0 left-0 h-screen bg-red-700 text-white transition-all duration-300 
      ${isMobile ? 'p-2' : 'p-4'} 
      ${isOpen ? (isMobile ? 'w-40' : 'w-64') : (isMobile ? 'w-14' : 'w-20')}`}>
      <div className={`${isMobile ? 'mb-4' : 'mb-8'} text-center`}>
        {/*Titolo*/}
        <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold ${isMobile ? 'mb-1' : 'mb-2'} ${!isOpen && isMobile && 'hidden'}`}>WorkoutPlus</h1>
        {/*line di separazione bianca che prende tutta la larghezza della side bar*/}
        <hr className="w-full mx-auto my-2 border-white" />
      </div>
      <nav className={`flex flex-col ${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center ${isMobile ? 'space-x-2 p-2 text-sm' : 'space-x-4 p-3'} rounded-lg hover:bg-white/10 transition-colors duration-200`}
          >
            <span className={`${isMobile ? 'min-w-[20px]' : 'min-w-[24px]'}`}>{item.icon}</span>
            <span className={`whitespace-nowrap ${!isOpen && 'hidden'}`}>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
