import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../shared/CustomInput';
import { post, put } from '../../services/apiHandler';
import toast from 'react-hot-toast';
function DeleteTeacher({id}) {
    const [secureText, setSecureText] = useState(true);

    const eyeIconPressHandler = async () => {
      secureText === true ?
          setSecureText(false) :
          setSecureText(true);
  }
    const { control, handleSubmit } = useForm();

    const handleDeleteStudent = async data => {
        const putData = {
            id: id 
        }

        console.log(putData)
        put("/api/users/deleteuser", putData).then((response) => {
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
            <div onClick={handleSubmit(handleDeleteStudent)} className=' p-2 primary flex justify-center items-center rounded-full text-white shadow-md hover:cursor-pointer font-normal'>
                Delete Teacher
            </div>
        </>
    )
}

export default DeleteTeacher