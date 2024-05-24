import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import WeekDetails from './WeekDetails';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import SpecificDayDetails from './SpecificDayDetails';
import { post } from '../services/apiHandler';
import toast from 'react-hot-toast';
import CustomModal from './CustomModal';
import SearchPage from './SearchPage';

function ServerDay(props) {
    const { day, outsideCurrentMonth, ...other } = props;
    var now = Date.now();
    var date = new Date(now);
    var today = date.getDate();
    var month = date.getMonth(); 
    var year = date.getFullYear();
    console.log(day.$y, "-", day.$M, "-", day.$D, "-", today, month, year)
    return (
        <>
            {day.$y == year && day.$M == month && day.$D == today ?
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} sx={{ backgroundColor: '#5F5BE4', color: 'white', fontSize: '1rem' }} />
                :
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} sx={{ color: 'black', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            }
        </>
    );
}

function formatDateNowToString() {
    let now = Date.now();
    let date = new Date(now);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let year = date.getFullYear().toString();
    let formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

function roundUpToNextHour() {
    let now = new Date();
    let hour = now.getHours();
    return `${hour}:00`;
}


function ArrowLeft() {
    return <KeyboardArrowLeftOutlinedIcon sx={{ color: 'black', fontSize: 16 }} />;
}

function ArrowRight() {
    return <KeyboardArrowRightOutlinedIcon sx={{ color: 'black', fontSize: 16 }} />;
}

function Calendar({ isAdmin }) {
    const [searchModalVsiible, setSearchModalVisible] = useState(false)
    const [data, setData] = useState(null)
    const [selectedDay, setSelectedDay] = useState(Date.now())
    const [dates, setDates] = useState(null)
    const [displayVariant, setDisplayVariant] = useState(1)

    useEffect(() => {
        handleClickDay(Date.now())
        handleGetCoursesByTime();
    }, [isAdmin])

    const handleClickDay = (e) => {
        const clickedDate = new Date(e);
        const daysBefore = 3;
        const daysAfter = 3;
        const startDate = new Date(clickedDate);
        startDate.setDate(clickedDate.getDate() - daysBefore);
        const endDate = new Date(clickedDate);
        endDate.setDate(clickedDate.getDate() + daysAfter);
        const dateRange = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}.${String(currentDate.getMonth() + 1).padStart(2, "0")}.${currentDate.getFullYear()}`;
            dateRange.push(formattedDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        console.log("Tarih Aralığı:", dateRange);
        setDates(dateRange)
        const formattedClickedDate = `${String(clickedDate.getDate()).padStart(2, "0")}.${String(clickedDate.getMonth() + 1).padStart(2, "0")}.${clickedDate.getFullYear()}`;
        setSelectedDay(formattedClickedDate);
    }

    const handleGetCoursesByTime = () => {

        post('/api/Course/GetCourseByTime', { day: formatDateNowToString() })
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


    return (

        <div className=' min-w-[75rem] w-full h-full  p-6  '>
            <div className=' w-full h-full grid grid-cols-5 shadow-md'>
                <div className=' flex flex-col space-y-6 col-span-1 p-6 primary bg-opacity-10 backdrop-filter backdrop-blur-sm border border-[#5F5BE4] text-black rounded-bl-md rounded-tl-md'>
                    <div className=' flex flex-col justify-center h-10'>
                        <div className=' flex flex-row space-x-[12px]'>
                            <div className=' w-[12px] h-[12px] hover:cursor-pointer rounded-full bg-red-400'>
                            </div>
                            <div className=' w-[12px] h-[12px] hover:cursor-pointer rounded-full bg-yellow-400'>
                            </div>
                            <div className=' w-[12px] h-[12px] hover:cursor-pointer rounded-full primary'>
                            </div>
                        </div>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar onChange={(e) => { handleClickDay(e) }}
                            sx={{
                                width: 1, fontSize: '6px', color: 'black',
                                '.MuiDayCalendar-header': {
                                    width: 1,
                                },
                                '.MuiDayCalendar-monthContainer': {
                                    width: 1,
                                    color: 'black',

                                },
                                '.MuiDayCalendar-weekContainer': {
                                    overflow: 'hidden',
                                    width: 1,
                                    color: 'black',

                                },

                                '.MuiDayCalendar-weekDayLabel': {
                                    aspectRatio: '1',
                                    height: 'auto',
                                    fontSize: '1.75em',
                                    color: 'black',
                                    marginLeft: 0,


                                },
                                '.MuiPickersCalendarHeader-label': {
                                    // Ay yazısı düzenlemeleri
                                    fontSize: '1em',
                                    justifyContent: 'center',
                                    textWrap: 'nowrap',
                                    width: 1,
                                    marginLeft: 0,
                                    justifySelf: 'start',
                                    alignItems: 'start',
                                    display: 'flex'

                                },

                                '.MuiPickersDay-dayWithMargin': {
                                    aspectRatio: '1',
                                    height: 'auto',
                                    fontSize: '1.75em',
                                    fontWeight: 300,

                                },

                            }}
                            slots={{
                                day: ServerDay,
                                leftArrowIcon: ArrowLeft,
                                rightArrowIcon: ArrowRight,
                                switchViewButton: null

                            }}


                        />
                    </LocalizationProvider>
                    <div className=' flex flex-col space-y-4'>
                            <h3>Upcoming Events: {formatDateNowToString()}</h3>
                            {
                                data && data.some(item => item.hour > roundUpToNextHour()) ? (
                                    data.map((item) => (
                                        item.hour > roundUpToNextHour() ? (
                                            <div className='space-y-[6px]' key={item.id}>
                                                <div className='w-full h-fit bg-white border border-[#5F5BE4] rounded-md p-3'>
                                                    <p className='primaryText'>{item.hour}</p>
                                                    <p>{item.name}</p>
                                                    <p>Student: {item.student.userName}</p>
                                                    <p>Teacher: {item.teacher.userName}</p>
                                                </div>
                                            </div>
                                        ) : null
                                    ))
                                ) : (
                                    <p>No upcoming events</p>
                                )
                            }
                        </div>
                </div>
                <div className=' flex flex-col col-span-4 p-6 h-full space-y-8 border border-l-0 border-[#5F5BE4]  rounded-br-md rounded-tr-md '>
                    <div className=' w-full h-10 flex flex-row justify-between items-center'>
                        {
                            displayVariant === 0 ?
                                <div className=' flex flex-col space-y-6'>
                                    <div className=' w-full  h-10 flex flex-row justify-center items-center space-x-[6px]'>
                                        <div className=' primary rounded-md p-1 flex justify-center w-16'>
                                            <p className=' text-white'>Day</p>
                                        </div>
                                        <div className=' rounded-md p-1 flex justify-center w-16'>
                                            <p onClick={() => setDisplayVariant(1)} className=' text-black'>Week</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className=' flex flex-col space-y-6'>
                                    <div className=' w-full  h-10 flex flex-row justify-center items-center space-x-[6px]'>
                                        <div className='rounded-md p-1 flex justify-center w-16'>
                                            <p onClick={() => setDisplayVariant(0)} className=' text-black'>Day</p>
                                        </div>
                                        <div className=' primary rounded-md p-1 flex justify-center w-16'>
                                            <p className=' text-white'>Week</p>
                                        </div>
                                    </div>
                                </div>
                        }
                        <div onClick={() => {setSearchModalVisible(true)}} className=' w-40 border bg-slate-100 rounded-md flex justify-start items-center space-x-[6px]'>
                            <SearchOutlinedIcon />
                            <p className=' text-[#00000050]'>Search</p>
                        </div>
                    </div>
                    <div className=' h-full'>
                        {
                            displayVariant === 0 ?
                                <SpecificDayDetails day={selectedDay} isAdmin={isAdmin} />
                                :
                                <WeekDetails dates={dates} selectedDay={selectedDay} isAdmin={isAdmin} />
                        }
                    </div>
                </div>
            </div>
            <CustomModal setState={setSearchModalVisible} visible={searchModalVsiible}>
                <SearchPage />
            </CustomModal>
        </div>
    )
}

export default Calendar