import React, { useEffect, useState } from 'react'
import ErrorBox from "../../components/ErrorBox/ErrorBox"
import "./Users.css"
import axios from 'axios'
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import EditModal from "../../components/ٍEditModal/EditModal"
import { MdEdit } from "react-icons/md";
import DetailsModal from "../../components/DetailsModal/DetailsModal"
export default function Users() {
  useEffect(() => {
    getAllUsers()
  }, [])
  let [allUsers, setAllUses] = useState([])
  let [mainUserID, setMainUserID] = useState(null)
  let [mainUserInfos, setMainUserInfos] = useState({})


  // showing    Modals 
  let [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  let [isShowEditModal, setIsShowEditModal] = useState(false)
  let [isShowDetailsModal, setIsShowDetailsModal] = useState(false)

  // Edit Form  states  

  let [userNewFirstName, setUserNewFirstName] = useState("")
  let [userNewLastName, setUserNewLastName] = useState("")
  let [userNewPassword, setUserNewPassword] = useState("")
  let [userNewUserName, setUserNewUserName] = useState("")
  let [userNewPhone, setUserNewPhone] = useState("")
  let [userNewAdress, setUserNewAdress] = useState("")
  let [userNewEmail, setUserNewEmail] = useState("")
  let [userNewScore, setUserNewScore] = useState("")
  let [userNewBuyRate, setUserNewBuyRate] = useState("")






  function getAllUsers() {
    axios.get('http://localhost:8000/api/users')
      .then((res) => {
        setAllUses(res.data)
      })
  }

  function removeUser() {
    axios.delete(`http://localhost:8000/api/users/${mainUserID}`)
      .then((response) => {
        getAllUsers()
        setIsShowDeleteModal(false)
      })

  }

  function closeEditModal() {
    setIsShowEditModal(false)
  }
  function editUser() {

    let newUserInfos = {
      firsname: userNewFirstName,
      lastname: userNewLastName,
      username: userNewUserName,
      password: userNewPassword,
      phone: userNewPhone,
      email: userNewEmail,
      address: userNewAdress,
      score: userNewScore,
      buy: userNewBuyRate,
    }

    axios.put(`http://localhost:8000/api/users/${mainUserID}`, newUserInfos)
      .then((response) => {
        getAllUsers()
        closeEditModal()

      })


  }

  return (

    <>

      {
        allUsers.length ? (
          <main className='tableUser'>
            <section className='tableUser-wrap'>
              <table className='tableUser-table'>
                <thead className='tableUser-table__thead'>
                  <tr className='tableUser-table__tr'>
                    <th className='tableUser-table__th'>نام  و نام  خانوادگی</th>
                    <th className='tableUser-table__th'>نام  کاربری</th>
                    <th className='tableUser-table__th'>رمز عبور</th>
                    <th className='tableUser-table__th'>شماره  تماس</th>
                    <th className='tableUser-table__th'>ایمیل</th>
                  </tr>
                </thead>

                <tbody className='tableUser-table__tbody'>
                  {
                    allUsers.map((singleUser) => (
                      <tr className='tableUser-table__tr2 ' key={singleUser.id}>
                        <td className='tableUser-table__td'>{singleUser.firsname} {singleUser.lastname}</td>
                        <td className='tableUser-table__td'>{singleUser.username} </td>
                        <td className='tableUser-table__td'> {singleUser.password}</td>
                        <td className='tableUser-table__td'>{singleUser.phone}</td>
                        <td className='tableUser-table__td'>{singleUser.email}</td>
                        <td className='tableUser-table__td--btns'>
                          <div className='tableUser-table__td-item'> <button className='tableUser-table__btn' onClick={() => {
                            setIsShowDeleteModal(true)
                            setMainUserID(singleUser.id)
                          }}>حذف</button></div>
                          <div className='tableUser-table__td-item'> <button className='tableUser-table__btn' onClick={() => {

                            setMainUserID(singleUser.id)
                            setIsShowEditModal(true)

                            setUserNewFirstName(singleUser.firsname)
                            setUserNewLastName(singleUser.lastname)
                            setUserNewPassword(singleUser.password)
                            setUserNewUserName(singleUser.username)
                            setUserNewPhone(singleUser.phone)
                            setUserNewAdress(singleUser.address)
                            setUserNewEmail(singleUser.email)
                            setUserNewScore(singleUser.score)
                            setUserNewBuyRate(singleUser.buy)
                          }

                          }>ویرایش</button></div>
                          <div className='tableUser-table__td-item'> <button className='tableUser-table__btn' onClick={() => {

                            setIsShowDetailsModal(true)
                            setMainUserInfos(singleUser)
                          }}    >جزییات</button></div>

                        </td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>

            </section>
          </main>
        ) : (<ErrorBox msg={"هیچ  کاربری  یافت  نشد  "}></ErrorBox>
        )
      }
      {isShowDeleteModal && <DeleteModal
        title={"آیا  از حذف کاربر اطمینان دارید  ؟"}

        cancelAction={() => { setIsShowDeleteModal(false) }}
        submitAction={removeUser}
      ></DeleteModal>}

      {
        isShowEditModal && <EditModal onHide={closeEditModal} onSubmit={editUser}>

          <form action="" className='form-edit'>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewFirstName} onChange={(event) => {

                setUserNewFirstName(event.target.value)

              }} type="text" name="" id="" placeholder='نام ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewLastName} onChange={(event) => {

                setUserNewLastName(event.target.value)

              }} type="text" name="" id="" placeholder='نام  و خانوادگی ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewPassword} onChange={(event) => {

                setUserNewPassword(event.target.value)

              }} type="text" name="" id="" placeholder='رمز عبور ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewUserName} onChange={(event) => {

                setUserNewUserName(event.target.value)

              }} type="text" name="" id="" placeholder='نام کاربری ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewPhone} onChange={(event) => {

                setUserNewPhone(event.target.value)

              }} type="text" name="" id="" placeholder='شماره تماس ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <textarea value={userNewAdress} onChange={(event) => {

                setUserNewAdress(event.target.value)

              }} type="text" name="" id="" placeholder='آدرس  کاربر  ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewEmail} onChange={(event) => {

                setUserNewEmail(event.target.value)

              }} type="text" name="" id="" placeholder='ایمیل  کاربر  ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewScore} onChange={(event) => {

                setUserNewScore(event.target.value)

              }} type="text" name="" id="" placeholder='امتیاز کاربر ' className='form-edit__group--inp' />
            </div>
            <div className='form-edit__group'>
              <MdEdit className='form-edit__group-icon' />
              <input value={userNewBuyRate} onChange={(event) => {

                setUserNewBuyRate(event.target.value)

              }} type="text" name="" id="" placeholder='میران  خرید کابر  ' className='form-edit__group--inp' />
            </div>


          </form>


        </EditModal>
      }


      {
        isShowDetailsModal && <DetailsModal onHide={() => { setIsShowDetailsModal(false) }}>
          <table className='tableForDetails'  >
            <thead className='tableForDetails-thead'>
              <tr className='tableForDetails-firstTR'>
                <th className='tableForDetails-th'>شهر :  </th>
                <th className='tableForDetails-th'>آدرس :  </th>
                <th className='tableForDetails-th'>امتیاز :  </th>
                <th className='tableForDetails-th'>میزان  خرید :  </th>
              </tr>
            </thead>
            <tbody className='tableForDetails-tbody'>
              <tr className='tableForDetails-secondTR'>
                <td className='tableForDetails-td'>{mainUserInfos.city}</td>
                <td className='tableForDetails-td'>{mainUserInfos.address}</td>
                <td className='tableForDetails-td'>{mainUserInfos.score}</td>
                <td className='tableForDetails-td'>{mainUserInfos.buy}</td>
              </tr>
            </tbody>
          </table>


        </DetailsModal>
      }





    </>
  )
}
