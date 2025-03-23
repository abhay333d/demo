import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleContact = (type) => {
    if (type === 'phone') {
      window.location.href = 'tel:+1-212-456-7890';
    } else if (type === 'email') {
      window.location.href = 'mailto:contact@furnivers.com';
    }
  };

  const handleCopyright = () => {
    alert('© 2024 FurniVers - Interior Design & AR Furniture Visualization');
  };

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <h1 className='text-3xl font-bold cursor-pointer' onClick={() => handleNavigate('/')}>Furniverse</h1>
            <p className='w-full md:w-2/3 text-gray-600'>
            Our aim at Furniverse is to transform houses into stylish, functional, and personalized spaces. We focus on quality, innovation, and customer satisfaction to bring your dream home to life.</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className='cursor-pointer hover:text-black transition-colors' onClick={() => handleNavigate('/')}>Home</li>
                <li className='cursor-pointer hover:text-black transition-colors' onClick={() => handleNavigate('/collection')}>Shop</li>
                <li className='cursor-pointer hover:text-black transition-colors' onClick={() => handleNavigate('/about')}>About us</li>
                <li className='cursor-pointer hover:text-black transition-colors' onClick={() => handleNavigate('/contact')}>Contact</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className='cursor-pointer hover:text-black transition-colors' onClick={() => handleContact('phone')}>+1-212-456-7890</li>
                <li className='cursor-pointer hover:text-black transition-colors' onClick={() => handleContact('email')}>contact@furnivers.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center cursor-pointer hover:font-medium transition-all' onClick={handleCopyright}>Copyright 2024@ furnivers.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
