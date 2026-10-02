import { db } from "../../DB/connection.js";

export const booksCollection = async (req, res) => {
    try {
        await db.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1,
                            description: "title is required and must be a non-empty string",
                        },
                    },
                },
            },
        });

        return res.status(200).json({ ok: 1 });
    } catch (error) {
        if (error) {
            return res.status(200).json({ ok: 1, note: "Collection already exists" });
        }
        return res.status(500).json({ ok: 0, error: error.message });
    }
};
export const authorsCollection =async (req,res) =>{
     try {
        const result = await db.collection("authors").insertOne(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ ok: 0, error: error.message });
    }
}
export const cappedLogsCollection= async (req,res)=>{
    try {
        await db.createCollection("logs",{
                capped:true,
                size:1024*1024
        })
        return res.status(200).json({ ok: 1 });
    } catch (error) {
        return res.status(500).json({ ok: 0, error: error.message });
    }
}
export const booksIndex = async (req, res) => {
    try {
        const result = await db.collection("books").createIndex({title:1});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ ok: 0, error:error.message});
    }
}


