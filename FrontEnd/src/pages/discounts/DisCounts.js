import React, { useEffect, useState } from 'react'
import ErrorBox from "../../components/ErrorBox/ErrorBox"
import axios from 'axios'


export default function DisCounts() {

  let [getAllOffs, setGetAllOffs] = useState([])


  useEffect(() => {
    axios.get("http://localhost:8000/api/offs")
      .then((response) => {
        setGetAllOffs(response.data)
      })
  }, [])
  return (

    <>

      {
        getAllOffs.length ? (getAllOffs.map((singleItem) => (
          <table>
            <thead>
              <tr>
                <th>Code  :  </th>
              </tr>
            </thead>

            <tbody>
              <tr>

                <td>{singleItem.code}</td>


              </tr>
            </tbody>
          </table>

        ))) : (


          <ErrorBox msg={"هیچ  کارت تخفیفی یافت  نشد  "}></ErrorBox>

        )
      }




    </>
  )
}
