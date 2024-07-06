import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toasts({ msg }) {

    // Show a success toast
    toast.success(msg, {
        position: "top-right", // You can customize the position
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false, // Show or hide the progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: false, // Pause the timer when hovered
        draggable: true, // Allow dragging the toast
    });


    return (




        <div>
            <ToastContainer /> {/* This renders the toast container */}
        </div>
    )
}





