import { ObjectId } from "mongodb";
import LogsModel from "../../DB/models/logs.model.js";

export const createLog = async (req, res) => {
    try {
        const { book_id, action } = req.body;
        const result = await LogsModel.insertOne({
            book_id: new ObjectId(book_id),
            action: action
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ ok: 0, error: error.message });
    }
}