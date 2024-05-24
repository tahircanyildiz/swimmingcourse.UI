import React from 'react'
import { post } from '../services/apiHandler'
import { useForm } from 'react-hook-form';
import CustomInput from '../shared/CustomInput';
import toast from 'react-hot-toast';

function Contact() {
  const {  handleSubmit,control,reset } = useForm();


  const receiveMail = (data) => {

    const postData = {
      to: ["kenmiles4145@gmail.com"],
      subject: `${"Ad:" +data.fullName}` + " " + `${"E-mail:" +data.email}` + " " + `${"Telefon:" +data.phone}`,
      body: data.body
    }

    console.log(postData)

    post("/api/Mail", postData).then((response) => {
      console.log(response)
      if (response === "Başarılı") {
        toast.success("Başarılı")
      } else {
        toast.error("Başarısız")
      }
    })
      .catch((error) => {
        toast.error('İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
      });
      resetForm();
  }
  const resetForm = () => {
    reset({
      fullName: '',
      email: '',
      phone: '',
      body: ''
    });
  }
  return (
    <div className=' h-[100vh] mt-10 p-6 flex flex-col space-y-8 '>
      <h1>Contact Us</h1>
      <div className=' grid grid-cols-1 lg:grid-cols-2 space-y-6 lg:space-y-0 '>
        <div className=' flex flex-col col-span-1 space-y-6'>
          <div className=' flex flex-col col-span-1 space-y-[6px]'>
            <p>E-mail, call or complete the form to learn how to swim.</p>
            <p>tahircanyildiz@hotmail.com</p>
            <p className=' underline'>+90 (545) 318 53 07</p>
          </div>
          <div className=' flex flex-col  space-y-[6px] '>
            <div className=' flex flex-col space-y-[3px]'>
              <h3>Customer Support</h3>
              <p>Need assistance or have a question? Our dedicated customer support team is here to help. Reach out to us via the contact form below, and we'll get back to you promptly to address any concerns or inquiries you may have.</p>
            </div>
            <div className=' flex flex-col space-y-[3px]'>
              <h3>Feedback Services</h3>
              <p>Your feedback matters to us! Whether you have suggestions for improvement, encountered an issue, or simply want to share your experience, we value your input. Use the form below to provide feedback, and we'll carefully review and consider your comments to enhance our services further. Thank you for helping us serve you better!</p>
            </div>
          </div>
        </div>
        <div className=' flex flex-col col-span-1 space-y-[6px]'>
          <div className=' flex flex-col space-y-5 justify-center items-center  w-full lg:px-40'>
            <h3 className=''>Get in Touch</h3>
            <p className='text-xs lg:text-sm font-normal'>Make sure to take a look at FAQ and our Knowledge</p>
            <div className=' border rounded-lg p-5 flex flex-col space-y-3 w-full '>
              <div className=' flex flex-col space-y-1'>
                <p className=''>Full Name</p>
                <CustomInput name={"fullName"} autoComplete={"Full Name"}  rules={{ required: 'Full Name required' }} placeholder={"Full Name"} control={control} type="text" />
              </div>
              <div className=' grid col-span-1 lg:grid-cols-2 lg:space-x-5'>
                <div className=' col-span-1'>
                  <p className=''>Email</p>
                  <CustomInput name={"email"} autoComplete={"E-mail"}  rules={{ required: 'E-mail required' }} placeholder={"E-mail"} control={control} type="text" />
                </div>
                <div className=' col-span-1'>
                  <p className=''>Phone</p>
                  <CustomInput name={"phone"} autoComplete={"Phone"}  rules={{ required: 'Phone required' }} placeholder={"Phone"} control={control} type="text"/>
                </div>
              </div>
              <div className=' flex flex-col space-y-1'>
                <p className=''>Your Message</p>
                <CustomInput name={"body"} autoComplete={"Body"}  rules={{ required: 'Message required' }} placeholder={"Message"} control={control}type="text"/>
              </div>
              <div onClick={handleSubmit(receiveMail)} className=' mt-[6px] p-2 primary text-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer font-normal'>
                Send Message
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact