import { Router } from "express";
import { createGenres, deleteGenre, getAllGenres, updateGenre } from "../controllers/genre.controllers";



const genreRoutes  = Router()

genreRoutes.get("/", getAllGenres)
genreRoutes.post("/", createGenres )
genreRoutes.patch("/:genreId", updateGenre)
genreRoutes.delete("/:genreId", deleteGenre)

export default genreRoutes;