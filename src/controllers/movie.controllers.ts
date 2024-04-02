import {Request, Response} from "express"

import UserModel from "../models/user.models"
import movieModel from "../models/movie.models"


export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const allMovies = await movieModel.find().populate("genres")
        res.status(201).send(allMovies)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const createMovie = async (req: Request, res: Response) => {
   const {name, image, score} = req.body
   const {userId} = req.params
   try {
        const movie = await movieModel.create({name, image, score})
        await UserModel.findByIdAndUpdate({_id: userId}, { $push: {movies: movie._id}})
        res.status(201).send(movie)
   } catch (error) {
        res.status(400).send(error)

   }
}

export const updateMovie = async (req: Request, res: Response) => {
    const {name, image, score} =  req.body
    const {movieId} = req.params
    try {
        const movieUpdated = await movieModel.findByIdAndUpdate(
            {_id: movieId}, 
            {name, image, score},
            {new:true}
        )
        res.status(201).send(movieUpdated)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const {movieId} = req.params
    try {
        const movieDeleted = await movieModel.findByIdAndDelete(
            {_id: movieId} 
        )
        res.status(201).send(movieDeleted)
    } catch (error) {
        res.status(400).send(error)
    }
    
}

