import React, { useState } from "react"
import "keen-slider/keen-slider.min.css"
export default function KeenSliderLandingpage({children}) {
  
 
    return (
        <div className="keen-slider__slide text-white rounded-lg text-xs lg:text-sm hover:cursor-pointer h-full">
          {
            children
          }
        </div>
    )
}
