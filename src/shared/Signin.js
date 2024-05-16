import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { post } from '../services/apiHandler';
import CustomInput from './CustomInput';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const router = useNavigate();
  const [secureText, setSecureText] = useState(true);

  const eyeIconPressHandler = async () => {
    secureText === true ?
      setSecureText(false) :
      setSecureText(true);
  }

  const { control, handleSubmit } = useForm();

  const onSignInPressed = async data => {
    post("/api/users/login", data).then((response) => {

      localStorage.setItem('token', response.accessToken)
      toast.success("Giriş Başarılı")
      router('/admin')
    })
      .catch((error) => {
        console.error('There is an error while requesting (users) POST:', error);
        toast.error(`${error?.response?.data}`, "Giriş Bilgileri Hatalı")
      });
  };


  return (
    <div className=' flex flex-col space-y-5'>
      <h1>Log In</h1>
      <CustomInput name={"userNameorEmail"} rules={{ required: 'Email required' }} placeholder={"E-mail"} control={control} type="text" />
      <CustomInput name={"password"} eyeIcon={true} onEyeIconPress={eyeIconPressHandler} secureText={secureText} secureTextEntry={secureText} rules={{ required: 'Şifre Gerekli' }} placeholder={"Şifre"} control={control} />
      <div onClick={handleSubmit(onSignInPressed)} className=' p-2 primary text-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer font-normal'>
        Login
      </div>
    </div>
  );
}



export default Signin;