import React, { useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import AddCourse from '../components/CourseTab/AddCourse';
import DeleteCourse from '../components/CourseTab/DeleteCourse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { post } from '../services/apiHandler';
import toast from 'react-hot-toast';

function DayDetails({ day, isAdmin }) {
    const [CourseAddModalVisible, setCourseAddModalVisible] = useState(false);
    const [CourseDeleteModalVisible, setCourseDeleteModalVisible] = useState(false);

    const [data, setData] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null)
    const [selectedId, setSelectedId] = useState(null)


    useEffect(() => {
        handleGetCoursesByTime();
    }, [day]);

    const handleGetCoursesByTime = () => {
        post('/api/Course/GetCourseByTime', { day: day })
            .then((response) => {
                console.log(response);
                if (response) {
                    setData(response);
                } else {
                    toast.error('Sonuç yok');
                }
            })
            .catch((error) => {
                toast.error('İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.');
            });
    };

    // Saat dilimlerine göre dersleri gruplayacak bir nesne oluşturun
    const coursesByTime = {};
    if (data) {
        data.forEach((item) => {
            if (!coursesByTime[item.hour]) {
                coursesByTime[item.hour] = [];
            }
            coursesByTime[item.hour].push(item);
        });
    }

    return (
        <>
            <div className='grid grid-rows-12 h-full'>
                {[...Array(11).keys()].map((index) => {
                    const hour = (index + 9).toString().padStart(2, '0') + ':00'; // Saat dilimini hesapla
                    return (
                        <div key={index} className='row-span-1 px-3 border-b border-r'>
                            <div className='h-32 relative py-3'>
                                {coursesByTime[hour] ? ( // Eğer saat diliminde ders varsa
                                    coursesByTime[hour].map((course, index) => (
                                        <div key={index} className='primary rounded-md bg-opacity-30 p-1 w-full max-w-full h-full max-h-full text-xs'>
                                            <div className=' space-y-[6px] flex flex-col h-fit'>
                                                <p className=' text-xs'>{course.name}</p>
                                                <p className=' text-xs'>Student:{course.student.userName}</p>
                                                <p className=' text-xs'>Teacher:{course.teacher?.userName}</p>
                                            </div>
                                            {
                                                isAdmin ?
                                                    <div onClick={() => { setCourseDeleteModalVisible(true); setSelectedId(course.id) }} className='hover:cursor-pointer absolute top-3 right-1 primaryText'>
                                                        <DeleteForeverIcon sx={{ fontSize: 16 }} />
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                    ))
                                ) : (
                                    isAdmin ?
                                        // Eğer saat diliminde ders yoksa
                                        <div onClick={() => { setCourseAddModalVisible(true); setSelectedHour(hour) }} className='hover:cursor-pointer self-center primaryText'>
                                            <AddCircleOutlineIcon />
                                        </div>
                                        :
                                        null
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <CustomModal visible={CourseAddModalVisible} setState={setCourseAddModalVisible}>
                <AddCourse selectedDay={day} selectedHour={selectedHour} onPress={() => handleGetCoursesByTime()} />
            </CustomModal>
            <CustomModal visible={CourseDeleteModalVisible} setState={setCourseDeleteModalVisible}>
                <DeleteCourse id={selectedId} onPress={() => handleGetCoursesByTime()} />
            </CustomModal>
        </>
    );
}

export default DayDetails;
