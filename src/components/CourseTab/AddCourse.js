import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../shared/CustomInput';
import { post } from '../../services/apiHandler';
import toast from 'react-hot-toast';
import SearchUserDropdown from '../../shared/SearchUserDropdown';
function AddCourse({ selectedDay, selectedHour, onPress }) {
  const [secureText, setSecureText] = useState(true);
  const [studentId, setStudentId] = useState(null)
  const [teacherId, setTeacherId] = useState(null)


  const eyeIconPressHandler = async () => {
    secureText === true ?
      setSecureText(false) :
      setSecureText(true);
  }
  const { control, handleSubmit } = useForm();

  const handlePostCourse = async data => {
    if (selectedHour === null) {
      toast.error('Bir saat seçin')
    } else {
      const postData = {
        studentId: studentId,
        teacherId: teacherId,
        name: data.name,
        status: true,
        day: selectedDay,
        hour: selectedHour
      }
      post("/api/Course", postData).then((response) => {
        console.log(response)
        if (response === "Başarılı") {
          onPress()
          toast.success(response)
        } else {
          toast.error(response)
        }
      })
        .catch((error) => {
          toast.error('İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
        });
    }

  };

  return (
    <>
      <div className=' space-y-[6px]'>
        <SearchUserDropdown url={'/api/Users/GetOnlyStudentsByLetter'} setID={setStudentId} />
        <SearchUserDropdown url={'/api/Users/GetOnlyTeachersByLetter'} setID={setTeacherId} />
        <CustomInput name={"name"} autoComplete={"name"} keyboardType={"default"} rules={{ required: 'name required' }} placeholder={"name"} control={control} />
        <CustomInput name={"day"} readOnly={true} autoComplete={"day"} placeholder={selectedDay} control={control} />
        <CustomInput name={"hour"} readOnly={true} placeholder={selectedHour} control={control} />
      </div>
      <div onClick={handleSubmit(handlePostCourse)} className=' mt-[6px] p-2 primary text-white flex justify-center items-center rounded-full shadow-md hover:cursor-pointer font-normal'>
        Add Course
      </div>
    </>
  )
}

export default AddCourse