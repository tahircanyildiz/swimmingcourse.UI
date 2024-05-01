import React, { useState } from "react"
import "keen-slider/keen-slider.min.css"
export default function KeenSliderItem({name, email , phone ,field}) {
  
 
    return (
        <div className="keen-slider__slide text-white rounded-lg border text-xs lg:text-sm hover:cursor-pointer primary bg-opacity-10 h-full p-6">
           <h3 className=" text-black">{name}</h3>
           <p  className=" text-black">Email: {email}</p>
           <p  className=" text-black">Phone: {phone}</p>
           <p  className=" text-black">Field: {field}</p>
        </div>
    )
}
