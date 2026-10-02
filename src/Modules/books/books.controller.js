import { Router } from "express";
import * as booksServices from "./books.services.js"

const router = Router()

router.post("/books",booksServices.createBook)
router.get("/books/title",booksServices.getBookTitle)
router.get("/books/genre",booksServices.getBookGenre)
router.get("/books/skip-limit",booksServices.getBookSkipLimit)
router.get("/books/year-integer",booksServices.getBooksYearInteger)
router.get("/books/exclude-genres",booksServices.getBooksExcludeGenres)
router.get("/books/Year",booksServices.getBookYear)
router.get("/books/aggregate1",booksServices.getAggregate1)
router.get("/books/aggregate2",booksServices.getAggregate2)
router.get("/books/aggregate3",booksServices.getAggregate3)
router.get("/books/aggregate4",booksServices.getAggregate4)
router.post("/books/batch",booksServices.createManyBooks)
router.patch("/books/:title",booksServices.updateBook)
router.delete("/books/before-year",booksServices.deleteBooksBeforeYear)


export default router