import React from 'react'
import   "./ErrorBox.css"
export default function ErrorBox({ msg }) {
    return (

        <>

            <div className='errorBox'>
                <h1 className='errorBox-text'>{msg}</h1>
            </div>


        </>
    )
}

