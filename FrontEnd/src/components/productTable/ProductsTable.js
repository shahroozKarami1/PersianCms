import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./ProductTable.css"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
// import ModalContext from '../../context/modalContext'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../ٍEditModal/EditModal'
import { FaDollarSign } from "react-icons/fa";
import ErrorBox from '../ErrorBox/ErrorBox'
import numeral from 'numeral';

export default function ProductsTable({ getAllProducts, allProducts }) {
    let [isShowDeleteModal, setisShowDeleteModal] = useState(false)
    let [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    let [isShowEditModal, setIsShowEditModal] = useState(false)
    let [productID, setAllProductID] = useState(null)
    let [mainProductInfos, setMainProductInfos] = useState({})
    // Edit  information  
    let [productNewTitle, setProductNewTitle] = useState("")
    let [productNewPrice, setProductNewPrice] = useState("")
    let [productNewCount, setProductNewCount] = useState("")
    let [productNewImg, setProductNewImg] = useState("")
    let [productNewPopularity, setProductNewPopularity] = useState("")
    let [productNewSale, setProductNewSale] = useState("")
    let [productNewColors, setProductNewColors] = useState("")






    useEffect(() => {
        getAllProducts()


    }, [])
    function HideDetailsModal() {
        setIsShowDetailsModal(false)
    }
    function SubmitInfoForEdit(event) {
        event.preventDefault()
        setIsShowEditModal(false)



        let allInformationForEdit = {
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            sale: productNewSale,
            colors: productNewColors
        }
        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(allInformationForEdit)
        }).then((res) => {
            return res.json()
        })
            .then((data) => {
                setIsShowEditModal(false)
                getAllProducts()

            })

    }
    function closeDeleteModal() {
        setisShowDeleteModal(false)
    }
    function removeProduct() {
        axios.delete(`http://localhost:8000/api/products/${productID}`)
            .then((res) => {
                console.log(res);
                getAllProducts()
                closeDeleteModal()

            })
    }
    return (
        <>

            {
                allProducts.length ? (
                    <section className='ProductTable'>
                        <main className='ProductTable-wrap'>
                            <table className='ProductTable-table'>
                                <thead className='ProductTable-table__thead'>
                                    <tr className='ProductTable-table__tr--header'>
                                        <th className='ProductTable-table__th'>عکس</th>
                                        <th className='ProductTable-table__th'>اسم</th>
                                        <th className='ProductTable-table__th'>قیمت </th>
                                        <th className='ProductTable-table__th'>موجودی</th>
                                    </tr>
                                </thead>
                                <tbody className='ProductTable-table__tbody'>
                                    {
                                        allProducts.map((item) => (
                                            <tr key={item.id} className='ProductTable-table__tr--body'>
                                                <td className='ProductTable-table__td'>
                                                    <img src={item.img} alt="" className='ProductTable-table__td--img' />
                                                </td>
                                                <td className='ProductTable-table__td'>
                                                    {item.title}
                                                </td>
                                                <td className='ProductTable-table__td'>
                                                    {numeral(item.price).format("0,0")}
                                                </td>
                                                <td className='ProductTable-table__td'>

                                                    {item.count}
                                                </td>
                                                <td className='ProductTable-table__td'>

                                                    <div className='ProductTable-table__td--btns'>
                                                        <button className='ProductTable-table__td--btn' onClick={() => {
                                                            setIsShowDetailsModal(true)
                                                            setMainProductInfos(item)
                                                        }}>جزییات</button>
                                                        <button className='ProductTable-table__td--btn' onClick={() => {
                                                            setisShowDeleteModal(true)
                                                            setAllProductID(item.id)

                                                        }}
                                                        >حذف</button>
                                                        <button className='ProductTable-table__td--btn' onClick={() => {
                                                            setIsShowEditModal(true)
                                                            setProductNewTitle(item.title)
                                                            setProductNewPrice(item.price)
                                                            setProductNewCount(item.count)
                                                            setProductNewImg(item.img)
                                                            setProductNewPopularity(item.popularity)
                                                            setProductNewSale(item.sale)
                                                            setProductNewColors(item.colors)
                                                            setAllProductID(item.id)
                                                        }}>ویرایش</button>
                                                    </div>
                                                </td>
                                            </tr>


                                        ))

                                    }
                                </tbody>
                            </table>
                        </main>
                    </section>
                ) : (
                    <ErrorBox msg={"هیچ  محصولی  یافت  نشد  "}></ErrorBox>

                )
            }



            {isShowDeleteModal && <DeleteModal title={"آیا  از حذف اطمینان دارید ؟  "} cancelAction={closeDeleteModal} submitAction={removeProduct}></DeleteModal>}
            {isShowDetailsModal && <DetailsModal onHide={HideDetailsModal}   >
                <table className='DetailsModal-table'>
                    <thead className='DetailsModal-table__thead'>
                        <tr className='DetailsModal-table__tr'>
                            <th className='DetailsModal-table__th'>محبوبیت</th>
                            <th className='DetailsModal-table__th'>رنگ</th>
                            <th className='DetailsModal-table__th'>تعداد  فروش</th>
                        </tr>
                    </thead>
                    <tbody className='DetailsModal-table__thead'>
                        <tr className='DetailsModal-table__tr'>
                            <td className='DetailsModal-table__td'>{mainProductInfos.popularity}</td>
                            <td className='DetailsModal-table__td'> {mainProductInfos.colors} </td>
                            <td className='DetailsModal-table__td'> {numeral(mainProductInfos.sale).format('0,0')}</td>
                        </tr>
                    </tbody>
                </table>
            </DetailsModal>}

            {isShowEditModal && <EditModal onHide={() => { setIsShowEditModal(false) }} onSubmit={SubmitInfoForEdit}>
                <form action="" className='formEditModal'>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='عنوان  جدید را  وارد  کنید  ' onChange={(event) => { setProductNewTitle(event.target.value) }} value={productNewTitle} className='formEditModal__inp' />
                    </div>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='مبلغ  جدید را  وارد  کنید  ' onChange={(event) => { setProductNewPrice(event.target.value) }} value={productNewPrice} className='formEditModal__inp' />
                    </div>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='موجودی  جدید را  وارد  کنید  ' onChange={(event) => { setProductNewCount(event.target.value) }} value={productNewCount} className='formEditModal__inp' />
                    </div>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='آدرس  کاور  جدید را  وارد  کنید  ' onChange={(event) => { setProductNewImg(event.target.value) }} value={productNewImg} className='formEditModal__inp' />
                    </div>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='میزان  محبوبیت  جدید را  وارد  کنید   ' onChange={(event) => { setProductNewPopularity(event.target.value) }} value={productNewPopularity} className='formEditModal__inp' />
                    </div>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='میزان  فروش  جدید را  وارد  کنید  ' onChange={(event) => { setProductNewSale(event.target.value) }} value={productNewSale} className='formEditModal__inp' />
                    </div>
                    <div className='formEditModal__wrap'>
                        <FaDollarSign className='formEditModal__icon' />
                        <input type="text" placeholder='تعداد    رنگ  بندی جدید را  وارد  کنید   ' onChange={(event) => { setProductNewColors(event.target.value) }} value={productNewColors} className='formEditModal__inp' />
                    </div>
                </form>


            </EditModal>}







        </>

    )
}


