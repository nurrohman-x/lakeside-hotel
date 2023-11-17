import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = (handlerRoomInputChange, newRoom) => {
    const [roomType, setRoomType] = useState([])
    const [showRoomTypeInput, setShowTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data)=>{
            setRoomType(data)
        })
    }, [])

    const handleNewRoomInputChange = (e) => {
        setNewRoomType(e.terget.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomType([...roomType, newRoomType])
            setNewRoomType("")
            setShowTypeInput(false)
        }
    }

    return (
        <>
        {roomType.length > 0 && (
            <div>
                <select name="" id="roomType" className="form-control"></select>
            </div>
        )}
        </>
    )
}

export default RoomTypeSelector