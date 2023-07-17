import mongoose from "mongoose"

async function connect(){
    try {
        const dbURL = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
        await mongoose.connect(dbURL)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
} 

export default connect