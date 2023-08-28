import React, { useContext, useEffect, useState } from 'react';
import Logo from '../img/logos.svg';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, handleOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isActive ? 'bg-red-400' : 'bg-blue-400'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full'>
        <Link to={'/'}>
          <div>
            <img className='w-[100px] h-30 ' src={Logo} alt=' ' />
          </div>
        </Link>
        <div onClick={handleOpen} className='cursor-pointer flex relative '>
          <BsBag className='text-3xl' />
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] text-white rounded-full flex justify-center items-center '>
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
