import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';

function Tables({ data, onPress, onEditPress, onDeletePress }) {

   
    

    return (
        <div className=" border border-[#00A9FF] min-w-[75rem] w-full p-5 rounded-lg shadow-md max-h-[75vh] overflow-y-auto overflow-x-auto lg:overflow-x-hidden">
            <div className="w-full flex justify-end items-center">
                <div onClick={() => onPress()} className=" py-1 px-2 w-fit h-fit rounded-lg text-white hover:cursor-pointer">
                    <AddCircleOutlineIcon sx={{ color:'#00A9FF'}} className=' shadow-md rounded-full' />
                </div>
            </div>
            {data ?
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Phone Number</th>
                            <th>Field</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center border-r-2">{item.username}</td>
                                <td className="text-center border-r-2">{item.email}</td>
                                <td className="text-center border-r-2">{item.phoneNumber}</td>
                                <td className="text-center border-r-2">{item.field}</td>
                                <td onClick={() => onEditPress(item)} className="text-center border-r-2 text-[600] hover:cursor-pointer hover:underline primaryText ">
                                    <EditNoteIcon />
                                </td>
                                <td onClick={() => onDeletePress(item.id)} className="text-center border-r-2 text-[600] hover:cursor-pointer hover:underline primaryText ">
                                    <DeleteForeverIcon />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <p className=' self-center flex justify-center items-center'>Loading...</p>
            }
        </div>
    );
}

export default Tables;
