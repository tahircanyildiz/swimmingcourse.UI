import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CustomInput from './CustomInput';
import { post } from '../services/apiHandler';
const Signup = ({setPageNum}) => {
    const [secureText, setSecureText] = useState(true);

    const eyeIconPressHandler = async () => {
        secureText === true ?
            setSecureText(false) :
            setSecureText(true);
    }

    const { control, handleSubmit } = useForm();

    const onSignUpPressed = async data => {
        
        post("/api/users", data).then((response) => {
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
        <div className=' flex flex-col space-y-5'>
            <CustomInput name={"Username"} autoComplete={"username"} keyboardType={"default"} rules={{ required: 'Kullanıcı Adı Gerekli' }} placeholder={"Kullanıcı Adı"} control={control} />
            <CustomInput name={"email"} autoComplete={"email"} rules={{ required: 'Email Gerekli' }} placeholder={"E-posta Adresi"} control={control} />
            <CustomInput name={"password"} eyeIcon={true} onEyeIconPress={eyeIconPressHandler} secureText={secureText} secureTextEntry={secureText} rules={{ required: 'Şifre Gerekli' }} placeholder={"Şifre"} control={control} />
            <CustomInput name={"passwordConfirm"} secureTextEntry={secureText} rules={{ required: 'Şifre Onayı Gerekli' }} placeholder={"Şifre Onayı"} control={control} />
            <div onClick={handleSubmit(onSignUpPressed)} className=' p-2 primary flex justify-center items-center rounded-full text-white shadow-md hover:cursor-pointer font-normal'>
                Sign Up
            </div>
            <div onClick={() => setPageNum(0)} className='p-2 bg-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer border font-normal'>
                Already have an account ? Sign in
            </div>
        </div>
    );
}



export default Signup;