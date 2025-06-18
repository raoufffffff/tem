import React from 'react'
import { FaFacebook } from "react-icons/fa6";
const SocialNetworks = ({ page }) => {
  return (
    <div
      className={`flex ${!page && "justify-center"} w-full py-2 mb-5`}
    >
      <a
        className={`${page ? "mx-1" : "mx-3"}`}
        href='https://web.facebook.com'
        target='_blank'
      >
        <FaFacebook
          color='#1877f2'
          size={page ? 30 : 40}
        />
      </a>
      <a
        className={`${page ? "mx-1" : "mx-3"}`}
        href='https://web.facebook.com'
        target='_blank'
      >
        <img
          src={'/ins.png'}
          width={page ? 30 : 40}
          height={page ? 30 : 40}
          alt='instgram'
          className='rounded-full'
        />
      </a>
      <a
        className={`${page ? "mx-1" : "mx-3"}`}
        href='https://web.facebook.com'
        target='_blank'
      >
        <img
          src={'/tik.png'}
          width={page ? 30 : 40}
          height={page ? 30 : 40}
          alt='instgram'
          className='rounded-full'
        />
      </a>

    </div>
  )
}

export default SocialNetworks