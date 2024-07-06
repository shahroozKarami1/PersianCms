import React, { useState } from 'react'
import ErrorBox from "../../components/ErrorBox/ErrorBox"
import  axios  from 'axios'
import AddNewPro from "../../components/addNewPro/AddNewPro"
import ProductTable from '../../components/productTable/ProductsTable'

export default function Products() {
  let [allProducts, setAllProducts] = useState([])


  function getAllProducts() {
    axios.get("http://localhost:8000/api/products/")
      .then((res) => {
        setAllProducts(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <AddNewPro getAllProducts={getAllProducts} allProducts={allProducts}></AddNewPro>
      <ProductTable getAllProducts={getAllProducts} allProducts={allProducts}></ProductTable>

    </>
  )
}
