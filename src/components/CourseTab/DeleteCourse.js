import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { del } from '../../services/apiHandler';
function DeleteCourse({id, onPress}) {
    

    const handleDeleteStudent = async () => {
        del(`/api/course/${id}`).then((response) => {
          console.log(response)
          if (response === 'Başarılı') {
            onPress()
            toast.success('Başarıyla silindi')
          } else {
            toast.error('Silinemedi')
          }
        })
          .catch((error) => {
            toast.error('İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
          });
      };

    return (
        <div className=' space-y-[6px]'>
            <p>Are you sure you want to delete this course ?</p>
            <div onClick={() => handleDeleteStudent()} className=' p-2 primary flex justify-center items-center rounded-full text-white shadow-md hover:cursor-pointer font-normal'>
                Delete Course
            </div>
        </div>
    )
}

export default DeleteCourse