import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>FurniVers was born out of a passion for interior design and a desire to revolutionize the way people experience furniture shopping. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and visualize premium furniture in their own spaces using augmented reality technology.</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality furniture pieces that cater to every style and preference. From contemporary and minimalist to classic and rustic, we offer an extensive collection sourced from trusted designers and craftspeople.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at FurniVers is to empower customers with innovative design solutions, convenience, and confidence in their furniture choices. We're dedicated to providing a seamless shopping experience that exceeds expectations, from virtual visualization to delivery and beyond.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>AR Visualization:</b>
            <p className=' text-gray-600'>Experience furniture in your space before purchasing with our cutting-edge augmented reality technology.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Expert Design Consultation:</b>
            <p className=' text-gray-600'>Our team of interior design professionals provides personalized advice to help create your perfect space.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Premium Craftsmanship:</b>
            <p className=' text-gray-600'>Each piece in our collection is selected for its quality, durability, and exceptional design to elevate your living spaces.</p>
          </div>
      </div>


    </div>
  )
}

export default About
