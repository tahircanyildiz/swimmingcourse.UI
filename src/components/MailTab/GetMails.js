import React, { useEffect, useState } from 'react'
import { get } from '../../services/apiHandler'
import toast from 'react-hot-toast'
import CustomModal from "../../shared/CustomModal"


function GetMails() {
    const [visible, setVisible] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedMail, setSelectedMail] = useState(null)

    useEffect(() => {
        get(`/api/mail/all?page=${pageNum}`).then(response => {
            setData(response);
            setIsLoaded(true);
        }).catch((error) => {
            toast.error('GET İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
        });
    }, []); // useEffect'i data veya isLoaded değil, pageNum değiştiğinde tetiklemek daha mantıklı

    const handleGetMailsByPageNum = () => {
        if (pageNum < 1) {
            toast.error("Please enter 1 or higher number")
        } else {
            setData(null)
            setIsLoaded(false)
            get(`/api/mail/all?page=${pageNum}`).then(response => {
                setData(response);
                setIsLoaded(true);
            }).catch((error) => {
                toast.error('GET İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
            });
        }

    }

    const handleSelectMail = (data) => {
        setSelectedMail(data);
        setVisible(true)
    }

    return (
        <>
            {
                data ?
                    <div className='flex flex-col justify-center items-center space-y-4'>
                        <div className=' flex flex-row  w-full justify-between items-center'>
                            <div className=' flex flex-row space-x-[6px]'>
                                <input className=' border text-black w-fit max-w-10 text-center' value={pageNum} onChange={(e) => { setPageNum(e.target.value) }} />
                                <button onClick={() => handleGetMailsByPageNum()}>
                                    {
                                        isLoaded ?
                                            <p>Change Page</p>
                                            :
                                            <p>Loading</p>
                                    }
                                </button>
                            </div>
                            <p>{pageNum === 1 ? "Between " + (pageNum) + " and " + (pageNum * 10) : pageNum > 1 ? "Between " + ((pageNum - 1)) + 1 + " and " + pageNum * 10 : null}</p>
                        </div>
                        {
                            data.emails.length > 0 ?
                            data.emails?.map((item, index) => (
                                <div onClick={() => { handleSelectMail(item) }} className=' hover:cursor-pointer flex flex-row space-x-4 items-center w-full h-fit p-4 border-b primary bg-opacity-10 backdrop-filter backdrop-blur-sm'>
                                    <p key={index}><span className=''>{item.subject.split(' ')[0]}</span> </p>
                                    <p className=' text-nowrap flex flex-row space-x-[6px]' key={index}> <span className=''>Mesaj:{item.body}</span></p>
                                </div>

                            ))
                            :
                            <p>There is no email to display</p>
                        }
                    </div>
                    :
                    <p>Mails Loading...</p>
            }
            <CustomModal style={{color:'grey'}} setState={setVisible} visible={visible}>
                {
                    selectedMail ?
                    <div style={{color:'grey'}} className=' min-w-96 min-h-96 w-fit h-fit flex flex-col space-y-4'>
                    <h3 style={{color:'black'}}>{selectedMail.subject.substring(0, selectedMail.subject.indexOf('E-mail'))}</h3>
                    <h3 style={{color:'black'}}>E-mail{selectedMail.subject.substring(selectedMail.subject.indexOf('E-mail') + 'E-mail'.length, selectedMail.subject.indexOf(' ', selectedMail.subject.indexOf('E-mail') + 'E-mail'.length))}</h3>
                    <h3 style={{color:'black'}} >{selectedMail.subject.substring(selectedMail.subject.indexOf('com') + 'com'.length, selectedMail.subject.indexOf(' ', selectedMail.subject.indexOf('com') + 'com'.length))}</h3>                            
                     <h3 style={{color:'red'}}>{selectedMail.body}</h3>
                </div>
                        :
                        <p>Loading...</p>
                }

            </CustomModal>
        </>
    )
}

export default GetMails
