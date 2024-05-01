import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../shared/CustomInput';
import { post, put } from '../../services/apiHandler';
import toast from 'react-hot-toast';
function UpdateStudent({ id }) {
  const [secureText, setSecureText] = useState(true);

  const eyeIconPressHandler = async () => {
    secureText === true ?
      setSecureText(false) :
      setSecureText(true);
  }
  const { control, handleSubmit } = useForm();

  const handlePutStudent = async data => {
    const putData = {
      id: id,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      field: data.field
    }

    console.log(putData)
    put("/api/users/changeinfos", putData).then((response) => {
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
        <CustomInput name={"username"} autoComplete={"username"} keyboardType={"default"}  placeholder={"Username"} control={control} />
        <CustomInput name={"email"} autoComplete={"email"}  placeholder={"E-mail Address"} control={control} />
        <CustomInput name={"phoneNumber"} autoComplete={"phone"}  placeholder={"Phone Number"} control={control} />
        <CustomInput name={"field"} autoComplete={"field"} keyboardType={"default"} placeholder={"field"} control={control} />
      </div>
      <div onClick={handleSubmit(handlePutStudent)} className=' mt-[6px] p-2 primary text-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer font-normal'>
        Update Student
      </div>
    </>
  )
}

export default UpdateStudent