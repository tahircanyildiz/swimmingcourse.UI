import React from 'react'
import DayDetails from './DayDetails'

function WeekDetails({ dates, selectedDay, isAdmin }) {
    const handleConvertMothNames = (value) => {
        // Ay isimlerini bir dizi içinde saklayalım
        const aylar = [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık"
        ];

        // Ay değerini alarak doğru ay ismini döndürelim
        return aylar[parseInt(value, 10) - 1]; // Diziler 0'dan başladığı için ay değerini 1 azaltarak dizideki karşılık gelen ismi alıyoruz.
    }
    return (
        <div className=' grid grid-cols-8'>
            <div className=' col-span-1'>
                <div className=' min-h-10 h-20 border-b border-r px-3'>
                </div>
                <div className=' grid grid-rows-12 h-full '>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>09:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>10:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>11:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>12:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>13:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>14:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>15:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>16:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>17:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>18:00</p>
                    </div>
                    <div className=' row-span-1 px-3 border-r   border-b'>
                        <p>19:00</p>
                    </div>
                </div>
            </div>
            {
                dates?.map((item) => (
                    item == selectedDay ?
                        <div className=' col-span-1 bg-green-300 bg-opacity-10'>
                            <div className=' min-h-10 h-20 border-b border-r px-3'>

                                <p>{handleConvertMothNames(item.split('.')[1])}</p>
                                <h2>{item.split('.')[0]}</h2>
                            </div>
                            <DayDetails day={item} isAdmin={isAdmin} />
                        </div>
                        :
                        <div className=' col-span-1'>
                            <div className=' min-h-10 h-20 border-b border-r px-3'>
                                <p>{handleConvertMothNames(item.split('.')[1])}</p>
                                <h2>{item.split('.')[0]}</h2>
                            </div>
                            <DayDetails day={item} isAdmin={isAdmin} />
                        </div>


                ))
            }
        </div>

    )
}

export default WeekDetails