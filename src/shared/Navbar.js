import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import Signin from './Signin'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function Navbar({ setPagenum, pageNum }) {
    const [modalVisible, setModalVisible] = useState(false)
    const router = useNavigate();


    const [isLoggedin, setIsLoggedIn] = useState(false)

    const handleOpenCloseModal = () => {
        modalVisible ?
            setModalVisible(false) : setModalVisible(true)
    }

    const handleSetPagenum = (value) => {
        setPagenum(value)
    }

    useEffect(() => {
        const res = localStorage.getItem('token')
        if (res) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [localStorage.getItem('token')])

    const handleLogout = () => {
        localStorage.removeItem('token');
        router('/')
    };
    return (
        <div className='  w-full h-[10%] '>
            <div className='w-full flex flex-row justify-between items-center p-6 '>
                <h2 onClick={() => handleSetPagenum(0)} className='text-[#00A9FF]'>Swimming Course</h2>
                {
                    isLoggedin ?
                        <div onClick={handleLogout} className='hover:cursor-pointer flex flex-row space-x-3 justify-center items-center '>
                            <LogoutIcon />
                            <p className=''>Çıkış yap</p>
                        </div>
                        :
                        <h3 onClick={() => handleOpenCloseModal()}>Log In</h3>
                }
            </div>
            <CustomModal visible={modalVisible} setState={setModalVisible} >
                <Signin />
            </CustomModal>
        </div>
    )
}

export default Navbar