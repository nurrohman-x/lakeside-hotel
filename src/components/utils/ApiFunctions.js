import axios from "axios";

export const api = axios.create({
    baseURL : 'http://localhost:9000'
})

export async function addRoom(photo, roomType, roomPrice){
    const formData = new formData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/new-room", formData);
    if(response.status === 201){
        return true
    }else{
        return false
    }
}

export async function getRoomTypes(){
    try{
        const response = await api.get("/rooms/room-type")
        return response.data
    }catch(e){
        throw new Error("Error fetching room types")
    }
}