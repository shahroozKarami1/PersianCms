import React, {  useContext, useEffect } from 'react'
// import ModalContext from '../../context/modalContext'
export default function DetailsModal({ onHide   , children }) {
    useEffect(() => {
        const HideDetailsModal = (event) => {
            if (event.keyCode === 27) {
                onHide()
            }
        }

        window.addEventListener("keydown", HideDetailsModal)
        return () => window.removeEventListener("keydown", HideDetailsModal)
    })

    return (
        <>

            <section className='DetailsModal  deleteMod-container   active'>
                <main className='DetailsModal-wrap deleteMod-wrap'>
                    {/* <small>برای بستن  کلید  ESC را بفشارید</small> */}
                        {children}
                </main>
            </section>







        </>
    )
}
