import { Router } from "express";
import { createMovie, getAllMovies } from "../controllers/movie.controllers";


const movieRouter = Router();

movieRouter.get("/", getAllMovies)
movieRouter.post("/:userId", createMovie)

export default movieRouter