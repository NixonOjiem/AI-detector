import React from 'react'

function LoadingSpinner() {
  return (
    <div>
         <div class="spinner">
            <div class="spinner__text">Loading</div>
            <div class="spinner__sector spinner__sector--red"></div>
            <div class="spinner__sector spinner__sector--blue"></div>
            <div class="spinner__sector spinner__sector--green"></div>

 </div>
    </div>
  )
}

export default LoadingSpinner;