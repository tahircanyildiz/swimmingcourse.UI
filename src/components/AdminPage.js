import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import StudentTab from '../shared/StudentTab';
import Calendar from '../shared/Calendar';
import { decodeAccessToken } from '../services/tokenDecoder';
import TeacherTab from '../shared/TeacherTab';
import CourseTab from '../shared/CourseTab';
function AdminPage() {
    const router = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router('/')
        } else {
            const decodedToken = decodeAccessToken(isAuth);
            const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            role === 'admin' ?
                setIsAdmin(true) : setIsAdmin(false)
            setLoaded(true)
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router('/')
    };

    const handleChangePage = (value) => {
        if (isAdmin) {
            setSelectedTab(value)

        } else {
            toast.error('Bu eylemi gerçekleştirmek için admin olmalısınız.')
        }
    }

    return (
        <div className=' min-w-full w-fit min-h-screen h-fit flex flex-col'>
            {
                loaded ?
                    <>
                        <div className=' w-full h-[10%] flex flex-row justify-between items-center p-6'>
                            <h3 onClick={() => router('/')} className=' flex'>Swimming Course</h3>
                            <div className='flex flex-row space-x-6'>
                                <div onClick={() => handleChangePage(0)} className={`hover:cursor-pointer text-xs lg:text-sm text-center ${selectedTab === 0 ? ' primaryText ' : ''}`} >Schedule</div>
                                {
                                    isAdmin ?
                                        <>
                                            <div onClick={() => handleChangePage(1)} className={`hover:cursor-pointer text-xs lg:text-sm text-center ${selectedTab === 1 ? 'primaryText ' : ''}`}>Student Management</div>
                                            <div onClick={() => handleChangePage(2)} className={`hover:cursor-pointer text-xs lg:text-sm text-center ${selectedTab === 2 ? 'primaryText ' : ''}`}>Teacher Management</div>
                                        </>
                                        :
                                        null
                                }

                            </div>
                            <div onClick={handleLogout} className='hover:cursor-pointer flex flex-row space-x-3 justify-center items-center '>
                                <LogoutIcon />
                                <p className=''>Çıkış yap</p>
                            </div>
                        </div>
                        <div className=' w-full h-full'>
                            {
                                selectedTab === 0 ?
                                    <Calendar isAdmin={isAdmin} />
                                    :
                                    selectedTab === 1 ?
                                        <StudentTab />
                                        :
                                        selectedTab === 2 ?
                                            <TeacherTab />
                                            :
                                            <Calendar isAdmin={isAdmin} />
                            }
                        </div>
                    </>
                    :
                    <p>Loading...</p>
            }
        </div>
    );
}

export default AdminPage;
