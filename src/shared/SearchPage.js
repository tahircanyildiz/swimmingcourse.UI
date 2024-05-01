import React, { useEffect, useState, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { get } from '../services/apiHandler';
import toast from 'react-hot-toast';
function SearchPage({ }) {
    const [name, setName] = useState(null)
    const [data, setData] = useState(null);
    const entry = useRef()

    useEffect(() => {
        handleGetCoursesByTime();
    }, []);

    const handleGetCoursesByTime = () => {
        get('/api/Course')
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

    const handleSearch = (e) => {
        setName(e?.target.value)
    };

    return (
        <div className=' w-[75vw] h-[50vh] flex flex-col space-y-8'>
            <div className=' flex flex-row items-center'>
                <input ref={entry} onChange={(e) => handleSearch(e)} placeholder={'Search a name'} className=' w-full  rounded-lg p-2 font-normal' />
            </div>
            {   
                name ?
                data ?
                    data.map((item) => (
                        item.student.userName.toLowerCase().includes(name.toLowerCase()) || item.teacher.userName.toLowerCase().includes(name.toLowerCase()) ?
                            <div className=' rounded-md  border borer-[#00A9FF] bg w-full h-full p-6 flex flex-col space-y-6'>
                                <h3>Day:<span className=' text-black'> {item?.day}</span></h3>
                                <h3>Hour:<span className=' text-black'> {item?.hour}</span></h3>
                                <h3>Course Title:<span className=' text-black'> {item?.name}</span></h3>
                                <h3>Teacher Name:<span className=' text-black'> {item?.teacher.userName}</span></h3>
                                <h3>Student Name:<span className=' text-black'> {item?.student.userName}</span></h3>
                            </div>
                            :
                            null
                    ))
                    :
                    null
                    :
                    <p className=' text-center text-[#00000050]'>Bir arama yapın</p>
            }
        </div>
    )
}

export default SearchPage