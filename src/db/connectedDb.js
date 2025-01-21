import mongoose from "mongoose"

const connectedDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db is connected.')
    } catch (error) {
        console.log('db is disconnected.')
    }
}

export default connectedDb;