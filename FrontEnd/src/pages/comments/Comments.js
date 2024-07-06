import "./Comments.css"
import React, { useEffect, useRef, useState } from 'react'
import ErrorBox from "../../components/ErrorBox/ErrorBox"
import DetailsModal from "../../components/DetailsModal/DetailsModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import EditModal from "../../components/ٍEditModal/EditModal"
import axios, { all } from 'axios'
export default function Comments() {
  // useEffect... 
  useEffect(() => {
    getAllCommmetnts()
  }, [])


  // useRef  
  // states
  let [allComments, setAllComments] = useState([])
  let [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  let [textComment, setTextComment] = useState("")
  let [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  let [commentID, setCommentID] = useState(null)
  let [isShowEditModal, setIsShowEditModal] = useState(false)
  let [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  let [commentObj, setCommentObj] = useState({})
  let [isShowRejectModal, setIsShowRejectModal] = useState(false)
  // showing
  function closeDetailsModal() {
    setIsShowDetailsModal(false)
  }
  function closeDeleteModal() {
    setIsShowDeleteModal(false)
  }
  function closeAcceptModal() {
    setIsShowAcceptModal(false)
  }
  function closeRejectModal() {
    setIsShowRejectModal(false)
  }


  // API  
  function getAllCommmetnts() {
    axios.get("http://localhost:8000/api/comments")
      .then((response) => {
        setAllComments(response.data)
      })
  }

  const closeEditModal = () => setIsShowEditModal(false)
  function submitEditModal() {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: textComment
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setIsShowEditModal(false)
        getAllCommmetnts()
      })
  }
  function deleteComment() {
    axios.delete(`http://localhost:8000/api/comments/${commentID}`)
      .then((res) => {
        setIsShowDeleteModal(false)
        setIsShowDetailsModal(false)
        getAllCommmetnts()

      })

  }
  function SubmitAcceptModal() {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: "POST"
    }).then((res) => {

      return res.json()

    })
      .then((data) => {


        getAllCommmetnts()
        closeAcceptModal()
        closeDetailsModal()
      })


  }

  function SubmitRejectModal() {
    axios.post(`http://localhost:8000/api/comments/reject/${commentID}`)
      .then((response) => {
        console.log(response);
        getAllCommmetnts()
        closeRejectModal()
        closeDetailsModal()
      })
  }



  return (
    <>

      {
        allComments.length ? (
          <main className='table-comment'>
            <section className='table-comment__wrap'>

              <table className='table-comment__table'>
                <thead className='table-comment__thead'>
                  <tr className='table-comment__tr'>
                    <th className='table-comment__th'>اسم  کاربر  </th>
                    <th className='table-comment__th'>محصول</th>
                    <th className='table-comment__th'>کامنت</th>
                    <th className='table-comment__th'>تاریخ</th>
                    <th className='table-comment__th'>ساعت </th>
                  </tr>
                </thead>
                <tbody className='table-comment__tbody'>
                  {
                    allComments.map((item) => (

                      <tr className='table-comment__tr   tr-body' key={item.id} style={{ backgroundColor: item.isAccept === 1 ? "#90EE90   " : "#FF7F7F " }}>
                        <td className='table-comment__td'>{item.userID} </td>
                        <td className='table-comment__td'> {item.productID}</td>
                        <td className='table-comment__td'><button className='table-comment__td--modal' onClick={() => {
                          setIsShowDetailsModal(true)
                          setTextComment(item.body)
                          setCommentID(item.id)
                          setCommentObj(item)
                        }}>دیدن متن </button></td>
                        <td className='table-comment__td'> {item.date}</td>
                        <td className='table-comment__td'> {item.hour} </td>

                      </tr>
                    ))
                  }

                </tbody>
              </table>

            </section>
            <small  style={{display :  "block"}}>کامنت های سبز به معنای تایید کامنت  توسط   مدیر  میباشد  ... </small>
            <small>کامنت های قرمز به معنای رد  کامنت  توسط   مدیر  میباشد  ... </small>
          </main>
        ) : (<ErrorBox msg={"هیچ  کامنتی یافت  نشد  !"}></ErrorBox>)



      }
      {
        isShowDetailsModal && (<DetailsModal onHide={closeDetailsModal}>
          <p className='text-comment'>{textComment}</p>
          <div className='action-comment__btns'>
            <button className='action-comment__btn' onClick={() => { setIsShowEditModal(true) }}>ویرایش</button>
            <button className='action-comment__btn' onClick={() => { setIsShowDeleteModal(true) }}>حذف</button>
            <button className='action-comment__btn'>پاسخ</button>


            {
              commentObj.isAccept === 0 && <button className='action-comment__btn' onClick={() => { setIsShowAcceptModal(true) }}  >تایید</button>

            }
            {
              commentObj.isAccept === 1 && <button className='action-comment__btn' onClick={() => { setIsShowRejectModal(true) }}  >رد  </button>

            }


          </div>
          <button className='close-btn' onClick={closeDetailsModal}>بستن</button>
        </DetailsModal>)

      }
      {isShowDeleteModal && <DeleteModal cancelAction={closeDeleteModal} title={"آیا  از حذف خود اطمینان دارید  ؟  "} submitAction={deleteComment}  ></DeleteModal>}
      {isShowAcceptModal && <DeleteModal cancelAction={closeAcceptModal} title={"آیا  از تایید   خود اطمینان دارید  ؟  "} submitAction={SubmitAcceptModal}  ></DeleteModal>}
      {isShowRejectModal && <DeleteModal cancelAction={closeRejectModal} title={"آیا  از  رد    خود اطمینان دارید  ؟  "} submitAction={SubmitRejectModal}  ></DeleteModal>}
      {isShowEditModal && <EditModal onSubmit={submitEditModal} onHide={closeEditModal}   >

        <textarea value={textComment} name="" id="" cols="100" rows="10" className='textAreaForEdit' onChange={(event) => { setTextComment(event.target.value) }}></textarea>
      </EditModal>}

    </>
  )
}
