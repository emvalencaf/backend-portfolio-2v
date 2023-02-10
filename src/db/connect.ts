import mongoose from "mongoose";

// enviroment variables
    // url
const mongoDBURL = process.env.DB_URL || "";
    // db's user credentials
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";


const connectDB = async () => {

    try{

        const dbURL = `mongodb+srv://${dbUser}:${dbPassword}${mongoDBURL}`;
        const dbConn = await mongoose.connect(dbURL);

        console.log(`[server]: connected to MongoDB database.`);

        return dbConn;

    } catch(err) {
        console.log(`[server]: there was an error when try to connect with MongoDB database: `, err);
    }


};

export default connectDB;