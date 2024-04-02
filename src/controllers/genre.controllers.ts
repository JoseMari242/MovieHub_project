import {Request, Response} from "express"

import UserModel from "../models/user.models"
import genreModel from "../models/genre.models"
import movieModel from "../models/movie.models"


export const getAllMGenres = async (req: Request, res: Response) => {
    try {
        const allGenres= await genreModel.find()
        res.status(201).send(allGenres)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const createGenre = async (req: Request, res: Response) => {
   const {name} = req.body
   const {movieId} = req.params
   try {
        const genre = await genreModel.create({name})
        await movieModel.findByIdAndUpdate({_id: movieId}, { $push: {genres: genre._id}})
        res.status(201).send(genre)
   } catch (error) {
        res.status(400).send(error)

   }
}

export const updateGenre = async (req: Request, res: Response) => {
    const {name} =  req.body
    const {genreId} = req.params
    try {
        const genreUpdated = await genreModel.findByIdAndUpdate(
            {_id: genreId}, 
            {name},
            {new:true}
        )
        res.status(201).send(genreUpdated)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteGenre = async (req: Request, res: Response) => {
    const {genreId} = req.params
    try {
        const genreDeleted = await genreModel.findByIdAndDelete(
            {_id: genreId} 
        )
        res.status(201).send(genreDeleted)
    } catch (error) {
        res.status(400).send(error)
    }
    
}

