import app from "./app";
import connectDB from "./db/connect";

// environment variables
const PORT = process.env.PORT || 5500;

// create web server
const main = async () => {
    try{
        // connection with MongoDB's database
        await connectDB();

        // open the server in the PORT
        app.listen(PORT, () => {
            console.log(`[server]: Server is running`);
        });

    } catch (e) {
        console.log(e);
    }
};

main();