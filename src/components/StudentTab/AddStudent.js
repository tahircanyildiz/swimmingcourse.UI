import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../shared/CustomInput';
import { post } from '../../services/apiHandler';
import toast from 'react-hot-toast';
import parsePhoneNumberFromString from 'libphonenumber-js';

function AddStudent() {
  const [secureText, setSecureText] = useState(true);

  const eyeIconPressHandler = async () => {
    secureText === true ?
      setSecureText(false) :
      setSecureText(true);
  }
  const { control, handleSubmit } = useForm();

  const handlePostStudent = async data => {
    post("/api/Users/CreateStudentUser", data).then((response) => {
      console.log(response)
      if (response === "Başarılı") {
        toast.success(response)
      } else {
        toast.error(response)
      }
    })
      .catch((error) => {
        toast.error('İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
      });
  };

  return (
    <>
      <div className=' space-y-[6px]'>
        <CustomInput name={"Username"} autoComplete={"username"} keyboardType={"default"} rules={{ required: 'Username required' }} placeholder={"Username"} control={control} type="text" />
        <CustomInput name={"email"} autoComplete={"email"} rules={{ required: 'Email required' }} placeholder={"E-mail Address"} control={control} type="text"/>
        <CustomInput name={"phoneNumber"} autoComplete={"phone"} rules={{ required: 'Phone number required' }} placeholder="(555) 555-5555" control={control} type="text"/>
        
        <CustomInput name={"field"} autoComplete={"field"} keyboardType={"default"} rules={{ required: 'field required' }} placeholder={"field"} control={control} type="text" />
        <CustomInput name={"password"} eyeIcon={true} onEyeIconPress={eyeIconPressHandler} secureText={secureText} secureTextEntry={secureText} rules={{ required: 'Password required' }} placeholder={"Password"} control={control} type="password" />
        <CustomInput name={"passwordConfirm"} secureTextEntry={secureText} rules={{ required: 'Password Confirmation required' }} placeholder={"Password Confirmation"} control={control} type="password"/>
      </div>
      <div onClick={handleSubmit(handlePostStudent)} className=' mt-[6px] p-2 primary text-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer font-normal'>
        Add Student
      </div>
    </>
  )
}

export default AddStudent