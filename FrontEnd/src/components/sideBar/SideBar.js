import React from 'react'
import "./SideBar.css"
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { FaShoppingBag } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { Link, NavLink } from "react-router-dom"
export default function SideBar() {

    return (
        <>

            <section className='sideBar'>
                <main className='sideBar-wrapper'>
                    <div className='sideBar-title'>
                        <h1 className='sideBar-title__text'>به داشبورد  خود خوش آمدید </h1>
                    </div>
                    <ul className='sideBar-list'>
          
                            <NavLink to="/products"  className='sideBar-item  '>
                                <IoHomeSharp className='sideBar-icon' />

                                صفحه  اصلی

                            </NavLink>


                            <NavLink to="/products" className='sideBar-item'>
                                <MdOutlineProductionQuantityLimits className='sideBar-icon' />

                                محصولات
                            </NavLink>

                            <NavLink to="comments"  className='sideBar-item'>
                                <FaComments className='sideBar-icon' />

                                کامنت ها
                            </NavLink>



                       
                            <NavLink to="/users"  className='sideBar-item'>
                                <HiUsers className='sideBar-icon' />

                                کاربران
                            </NavLink>

                            <NavLink to="/orders"    className  = "sideBar-item">
                                <FaShoppingBag className='sideBar-icon' />

                                سفارشات
                            </NavLink>

                            <NavLink to="/disCounts"  className='sideBar-item'>
                                <MdDiscount className='sideBar-icon' />


                                تخفیف ها
                            </NavLink>

                    </ul>
                </main>


            </section>


        </>
    )
}
