import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: null,
        roomPrice: null
    })

    const [imgPreview, setImgPreview] = useState("")
    const [msgSuccess, setMsgSuccess] = useState("")
    const [msgError, setMsgError] = useState("")

    const handlerRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value.parseInt(value)
            } else {
                value = ""
            }
        }
        setNewRoom({...newRoom, [name]: value})
    }

    const handleImgChange = (e) => {
        const selectedImg = e.target.files[0]
        setNewRoom({...newRoom, [photo]: selectedImg})
        setImgPreview(URL.createObjectURL(selectedImg))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setMsgSuccess("A new room was added to the database")
                setNewRoom({photo: null, roomType: null, roomPrice: null})
                setImgPreview("")
                setMsgError("")
            }else{
                setMsgError("Error adding room")
            }
        } catch (error) {
            setMsgError(error.message)
        }
    }

    return (
        <>
        <section className='container mt-5 mb-5'>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add a New Room</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="formType" className="form-label">Room Type</label>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">Room Price</label>
                            <input type="number" required className="form-control" id="roomPrice" name="roomPrice" value={newRoom.roomPrice} onChange={handlerRoomInputChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo</label>
                            <input type="file" id="photo" className="form-control" onChange={handleImgChange}/>
                            {imgPreview && (
                                <img src={imgPreview} alt="Preview room image" style={{maxWidth: "400px", maxHeight: "400px"}} className="mb-3"/>
                            )}
                        </div>
                        <div className="d-grid d-md-flex mt-2">
                            <button className="btn btn-outline-primary ml-5">Save Room</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default AddRoom