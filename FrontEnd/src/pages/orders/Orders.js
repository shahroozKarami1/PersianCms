
import React, { useEffect, useState } from 'react'
import ErrorBox from "../../components/ErrorBox/ErrorBox"
import axios from 'axios'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./Orders.css"
export default function Orders() {
  useEffect(() => {
    getAllOrders()

  }, [])
  let [allOrders, setAllOrders] = useState([])
let  [orderID   ,  setOrderID]  = useState(null)



  function getAllOrders() {
    
    axios.get('http://localhost:8000/api/orders')
      .then((res) => {
        setAllOrders(res.data)
        setOrderID(
          res.data.map((item)  =>  {
                        return  item.id
           })
      

        ) 
      })
  }


  console.log(orderID);
  const rows = allOrders

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'userID',
      headerName: 'نام  کاربری ',
      width: 150,
      editable: true,
    },
    {
      field: 'productID',
      headerName: ' نام  محصول  ',
      width: 200,
      editable: true,
    },
    {
      field: 'sale',
      headerName: 'تعداد  فروش  ',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'قیمت  ',
      sortable: false,
      width: 200,
    },
    {
      field: 'hour',
      headerName: 'ساعت  خرید  ',
      sortable: false,
      width: 160,
    },
    {
      field: "active",
      sortable: false,
      width: 160,
      renderCell: (cellValues) => (
        <button className=' removeBtn-dataGrid' onClick={removeOrders}>
          حذف اطلاعات
        </button>

      )

    },
  ];
function removeOrders () {
console.log("love js  for all  the Time  ... ");
}


  return (

    <>

      {
        allOrders.length ? (

          <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
              className='dataGridTable'
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        ) : (

          <ErrorBox msg={"هیچ  سفارشی  یافت  نشد  "}></ErrorBox>

        )
      }




    </>
  )
}





