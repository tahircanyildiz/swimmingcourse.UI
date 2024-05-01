import React, { useEffect, useState , useRef} from 'react';
import { post } from '../services/apiHandler';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
function SearchUserDropdown({ url, setID }) {
    const [data, setData] = useState(null);
    const [listModalVisible, setListModalVisible] = useState(false);
    const [placeholder, setPlacehodler] = useState('Choose a user')
    const entry = useRef()

    useEffect(() => {

    },[placeholder, url])

    const handleSearch = (e) => {
        post(url, { letter: e?.target.value })
            .then((response) => {
                console.log(response);
                if (response) {
                    setData(response);
                } else {
                    toast.error('No data found');
                }
            })
            .catch((error) => {
            });
    };

    const handleOpenCloseModalVisible = () => {
        setListModalVisible(!listModalVisible);
    };

    const handleSelectUser = (id) => {
        setID(id)
    }

    return (
        <div onClick={handleOpenCloseModalVisible} className='w-full h-fit relative border rounded-md'>
            <div className=' flex flex-row items-center'>
            <input ref={entry} onChange={(e) => handleSearch(e)} placeholder={placeholder} className=' w-full  rounded-lg p-2 font-normal' />
            {
                listModalVisible ?
                    <div>
                        <CloseIcon />
                    </div>
                    :
                    <div>
                        <SearchIcon />
                    </div>
            }
            </div>
            
            {
                listModalVisible ?
                    <div className='absolute z-50 -bottom-20 min-h-20 space-y-[6px] bg-white border w-full h-fit max-h-96 overflow-y-auto'>
                        {data ? (
                            data.map((item, index) => (
                                <div onClick={() => { setID(item.id); setPlacehodler(item.username); entry.current.value = null  }} key={index} className='border-b border-dashed p-2'>
                                    {item.username}
                                </div>
                            ))
                        ) : (
                            <p>List is empty</p>
                        )}
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default SearchUserDropdown;
