import React, { useEffect } from 'react'
import "./EditModal.css"
export default function EditModal({ children, onSubmit, onHide }) {
    useEffect(() => {
        const EditModalFunc = (event) => {
            if (event.keyCode === 27) {
                onHide()
            }
        }

        window.addEventListener("keydown", EditModalFunc)
        return () => window.removeEventListener("keydown", EditModalFunc)
    })



    return (
        <>
            <section className="EditModal   active ">
                <main className='EditModal-wrap'>
                    <h1 className='EditModal-Title'> اطلاعات  جدید را  وارد کنید  ... </h1>

                    {children}
                    <div className='EditModal-btns'>
                        <button className='EditModal-btn' onClick={onSubmit}>ثبت  اطلاعات </button>
                    </div>
                </main>
            </section>





        </>
    )
}
