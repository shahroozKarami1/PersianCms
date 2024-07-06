import React, { useState } from 'react'
import "./AddNewPro.css"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { GiPriceTag } from "react-icons/gi";
import { MdOutlineInventory } from "react-icons/md";
import { FaPhotoVideo } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdOutlinePointOfSale } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import axios from 'axios';

// lift زدن  رو  یادت  نرهااا  
export default function AddNewPro({getAllProducts  }) {
    let [newTitleForProduct, setNewTitleForProduct] = useState("")
    let [newPriceForProduct, setNewPriceForProduct] = useState("")
    let [newCountForProduct, setNewCountForProduct] = useState("")
    let [newImgForProduct, setNewImgForProduct] = useState("")
    let [newPopularityForProduct, setNewPopularityForProduct] = useState("")
    let [newSaleForProduct, setNewSaleForProduct] = useState("")
    let [newColorsForProduct, setNewColosForProduct] = useState("")

    function addNewProduct(e) {
        e.preventDefault()
        let addNewProduct = {
            title: newTitleForProduct,
            price: newPriceForProduct,
            count: newCountForProduct,
            img: newImgForProduct,
            popularity: newPopularityForProduct,
            sale: newSaleForProduct,
            colors: newColorsForProduct
        }
        function clearInputs() {
            setNewTitleForProduct("")
            setNewPriceForProduct("")
            setNewCountForProduct("")
            setNewImgForProduct("")
            setNewPopularityForProduct("")
            setNewSaleForProduct("")
            setNewColosForProduct("")
        }
        


        axios.post("http://localhost:8000/api/products/", addNewProduct)
            .then((res) => {
                clearInputs()
                getAllProducts()
            })
    }
    return (
        <>
            <section className='addNewPro'>

                <h1 className='addNewpro-title'>افزودن محصول جدید </h1>
                <form action="" className='addNewPro-form'>
                    <div className='addNewPro-form__wrap'>
                        <div className='addNewPro-form__item'>



                            <MdDriveFileRenameOutline className='addNewPro-form__icon' />
                            <input type="text" className='addNewPro-form__inp' value={newTitleForProduct} placeholder='اسم  محصول را بنویسید' onChange={(event) => { setNewTitleForProduct(event.target.value) }} />
                        </div>
                        <div className='addNewPro-form__item'>
                            <GiPriceTag className='addNewPro-form__icon' />
                            <input type="text" className='addNewPro-form__inp' value={newPriceForProduct} placeholder='قیمت  محصول را بنویسید' onChange={(event) => { setNewPriceForProduct(event.target.value) }} />
                        </div>
                        <div className='addNewPro-form__item'>
                            <MdOutlineInventory className='addNewPro-form__icon' />
                            <input type="number" className='addNewPro-form__inp' value={newCountForProduct} placeholder='موجودی  محصول را بنویسید' onChange={(event) => { setNewCountForProduct(event.target.value) }} />
                        </div>
                        <div className='addNewPro-form__item'>
                            <FaPhotoVideo className='addNewPro-form__icon' />

                            <input type="text" className='addNewPro-form__inp' value={newImgForProduct} placeholder='آدرس  عکس  محصول را بنویسید' onChange={(event) => { setNewImgForProduct(event.target.value) }} />
                        </div>
                        <div className='addNewPro-form__item'>
                            <FaStar className='addNewPro-form__icon' />
                            <input type="number" className='addNewPro-form__inp' value={newPopularityForProduct} placeholder='میزان محبوبیت  محصول را بنویسید' onChange={(event) => { setNewPopularityForProduct(event.target.value) }} />
                        </div>
                        <div className='addNewPro-form__item'>
                            <MdOutlinePointOfSale className='addNewPro-form__icon' />
                            <input type="number" className='addNewPro-form__inp' value={newSaleForProduct} placeholder='میران فروش  محصول را بنویسید' onChange={(event) => { setNewSaleForProduct(event.target.value) }} />
                        </div>
                        <div className='addNewPro-form__item'>
                            <IoIosColorPalette className='addNewPro-form__icon' />

                            <input type="number" className='addNewPro-form__inp' value={newColorsForProduct} placeholder='تعداد  رنگ بندی  محصول را بنویسید' onChange={(event) => { setNewColosForProduct(event.target.value) }} />
                        </div>
                    </div>
                    <button className='addNewPro-form__btn' onClick={(e) => { addNewProduct(e) }}>ثبت  محصول</button>
                </form>
            </section>




        </>
    )
}
