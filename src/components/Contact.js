import React from 'react'

function Contact() {
  return (
    <div className=' h-[100vh] mt-10 p-6 flex flex-col space-y-8 text-center '>
      <h1 className='text-center'>Contact Us</h1>
      <div className=' grid grid-cols-1 lg:grid-cols-2 space-y-6 lg:space-y-0 '>
        <div className=' flex flex-col col-span-1 space-y-6 justify-center h-full'>
          <div className=' flex flex-col col-span-1 space-y-[6px]'>
            <p>E-mail, call or complete the form to learn how to swim.</p>
            <p>info@swimmincourse.io</p>
            <p className=' underline'>321-32132132</p>
            <br></br>
          </div>
          <div className=' flex flex-col  space-y-[6px] '>
            <div className=' flex flex-col space-y-[3px]'>
              <h3>Customer Support</h3>
              <p>Need assistance or have a question? Our dedicated customer support team is here to help. Reach out to us via the contact form below, and we'll get back to you promptly to address any concerns or inquiries you may have.</p>
              <br></br>
            </div>
            <div className=' flex flex-col space-y-[3px]'>
              <h3>Feedback Services</h3>
              <p>Your feedback matters to us! Whether you have suggestions for improvement, encountered an issue, or simply want to share your experience, we value your input. Use the form below to provide feedback, and we'll carefully review and consider your comments to enhance our services further. Thank you for helping us serve you better!</p>
            </div>
          </div>
        </div>
        <div className=' flex flex-col col-span-1 space-y-[6px]'>
          <div className=' flex flex-col space-y-5 justify-center items-center text-white w-full lg:px-40'>
            <h3 className=''>Get in Touch</h3>
            <p className='text-xs lg:text-sm font-normal'>Make sure to take a look at FAQ and our Knowledge</p>
            <div className=' border rounded-lg p-5 flex flex-col space-y-3 w-full '>
              <div className=' flex flex-col space-y-1'>
                <p className=''>Full Name</p>
                <input className=' w-full bg-transparent border rounded-lg text-lg p-1' />
              </div>
              <div className=' grid col-span-1 lg:grid-cols-2 lg:space-x-5'>
                <div className=' col-span-1'>
                  <p className=''>Email</p>
                  <input className=' w-full bg-transparent border rounded-lg text-lg p-1' />
                </div>
                <div className=' col-span-1'>
                  <p className=''>Phone</p>
                  <input className=' w-full bg-transparent border rounded-lg text-lg p-1' />
                </div>
              </div>
              <div className=' flex flex-col space-y-1'>
                <p className=''>Your Message</p>
                <textarea className=' w-full bg-transparent border rounded-lg text-lg p-1'>

                </textarea>
              </div>
              <div className=' mt-[6px] p-2 primary text-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer font-normal '>
                Send Message
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;