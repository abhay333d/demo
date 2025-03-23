import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} className='block border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white p-3' to={`/product/${id}`}>
      <div className='overflow-hidden rounded-md mb-3'>
        <img className='w-full h-52 object-cover hover:scale-105 transition-all duration-500' src={image[0]} alt={name} />
      </div>
      <div className='px-1'>
        <h3 className='font-medium text-gray-800 truncate text-sm sm:text-base'>{name}</h3>
        <div className='flex justify-between items-center mt-2'>
          <p className='font-bold text-gray-900 text-sm sm:text-base'>{currency}{price}</p>
          <div className='bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs transition-colors'>
            View Details
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
