import React, { useContext  ,  useEffect} from 'react'
import "./DeleteModal.css"
import ReactDOM from 'react-dom'
import ModalContext from '../../context/modalContext'
import axios from 'axios'
import Toasts from '../Toasts/Toasts'
export default function DeleteModal({ cancelAction, submitAction     ,  title }) {
  // function deleteModalCancelAction() {
  //   // ModalDataContext.setisShowDeleteModal(false)
  // }
  // function deleteModalSubmitAction() {

  //   ModalDataContext.setisShowDeleteModal(false)
  //   axios.delete(`http://localhost:8000/api/products/${ModalDataContext.productID}`)
  //     .then((res) => {
  //       ModalDataContext.setisShowDeleteModal(false);
  //       ModalDataContext.getAllProducts();
  //       <Toasts msg={"حذف با  موفقیت  انجام  شد ..."}></Toasts>

  //     })
  // }
  useEffect(() => {
    const HideDeleteModal = (event) => {
      if (event.keyCode === 27) {
        cancelAction()
      }
    }

    window.addEventListener("keydown", HideDeleteModal)
    return () => window.removeEventListener("keydown", HideDeleteModal)
  },[])

  return ReactDOM.createPortal(

    <>

      <main className='deleteMod-container active'>
        <div className='deleteMod-wrap   '>
          <h1 className='deleteMod-text'>{title} </h1>
          <div className='deleteMod-btns'>
            <button className='    deleteMod-btn    btnForYes' onClick={() => {
              // deleteModalSubmitAction()
              submitAction()
            }

            }>بله</button>
            <button className='    deleteMod-btn    btnForNo' onClick={() => {
              // deleteModalCancelAction()
              cancelAction()
            }}>خیر</button>
          </div>
        </div>

      </main>


    </>, (document.getElementById("modalParents"))
  )
}
