import React from 'react'
import "./Header.css"
import { IoIosNotifications } from "react-icons/io";
import { MdLightMode } from "react-icons/md";

export default function Header() {
  return (
    <>
      <header className='header'>


        <main className='header-wrapper' >
          <div className='header-right'>
            <img src="/imgs/img-profile.jpg" alt="prorile" className='header-right__img' />
            <div className='header-right__profile'>
              <span>شهروز کرمی</span>
              <span>فرانت  اند </span>
            </div>
          </div>
          <div className='header-left'>
            <div className='header-left__searchBar'>
              <input type="text" placeholder='جست و جو  کنید :)' className='header-left__searchBar--inp' name="" id="" />
              <button className='header-left__searchBar--btn'>جست  و جو  </button>
            </div>
            <div className='header-left__btn'><IoIosNotifications className='header-left__icon' />
            </div>
            <div className='header-left__btn'><MdLightMode   className='header-left__icon' />
            </div>
          </div>

        </main>
      </header>






    </>
  )
}
