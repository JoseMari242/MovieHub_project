import { Router } from "express";
import { createGenre, deleteGenre, getAllMGenres, updateGenre } from "../controllers/genre.controllers";



const genreRoutes  = Router()

genreRoutes.get("/", getAllMGenres)
genreRoutes.post("/:movieId", createGenre )
genreRoutes.patch("/:genreId", updateGenre)
genreRoutes.delete("/:genreId", deleteGenre)

export default genreRoutes;