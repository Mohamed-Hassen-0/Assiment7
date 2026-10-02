import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL)

export const db = client.db("library_DB")

export const connectDB = async ()=>{
try {
   await client.connect()
    console.log('Connected successfully to library_DB server');
} catch (error) {
    console.log('Error Connecting to library_DB server',error);
    process.exit(1)
}
}