import { BooksModel, LogsModel } from "../../DB/models/index.js";

export const createBook = async (req, res) => {
  try {
    const result = await BooksModel.insertOne(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const createManyBooks = async (req, res) => {
  try {
    const result = await BooksModel.insertMany(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const updateBook = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await BooksModel.updateOne(
      { title },
      {
        $set: { year: 2022 },
      },
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getBookTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const result = await BooksModel.findOne({ title });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getBookYear = async (req, res) => {
  try {
    const { from, to } = req.query;
    const result = await BooksModel.find({
      year: { $gte: Number(from), $lte: Number(to) },
    }).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getBookGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const result = await BooksModel.find({ genres: genre }).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getBookSkipLimit = async (req, res) => {
  try {
    const result = await BooksModel.find({})
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getBooksYearInteger = async (req, res) => {
  try {
    const result = await BooksModel.find({ year: { $type: "int" } }).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getBooksExcludeGenres = async (req, res) => {
  try {
    const result = await BooksModel.find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    }).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const deleteBooksBeforeYear = async (req, res) => {
  try {
    const { year } = req.query;
    const result = await BooksModel.deleteMany({ year: { $lt: Number(year) } });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getAggregate1 = async (req, res) => {
  try {
    const result = await BooksModel.aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $sort: { year: -1 } },
    ]).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getAggregate2 = async (req, res) => {
  try {
    const result = await BooksModel.aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { title: 1, author: 1, year: 1, _id: 0 } },
    ]).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getAggregate3 = async (req, res) => {
  try {
    const result = await BooksModel.aggregate([
      { $unwind: "$genres" },
      { $project: { title: 1, genres: 1, _id: 0 } },
    ]).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
export const getAggregate4 = async (req, res) => {
  try {
    const result = await LogsModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $project: {
          action: 1,
          "book_details.title": 1,
          "book_details.author": 1,
          "book_details.year": 1
        },
      },
    ]).toArray();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ ok: 0, error: error.message });
  }
};
