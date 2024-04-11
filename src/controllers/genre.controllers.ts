import {Request, Response} from "express"
import prisma from "../db/client";


export const getAllGenres = async (req:Request, res:Response) => {
    try {
        const genres = await prisma.genres.findMany(
            {
                include: {
                    movie: {
                        select: {
                            movie: true
                        }
                    }
                }
            }
        );
        res.status(200).send({
            type: "array",
            msg: "all genres",
            data: genres
        })
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
}

export const createGenres = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({ message: "The field name is required" });
    }
    try {
        const existingGenre = await prisma.genres.findFirst({
            where: { name: name }
        });
        if (existingGenre) {
            return res.status(400).send({ message: "The genre already exists" });
        }
        const newGenre = await prisma.genres.create({
            data: { name }
        });
        res.status(201).send({
            type: typeof newGenre,
            msg: "Genre created successfully",
            data: newGenre,
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const updateGenre = async (req: Request, res: Response) => {
    const {name} =  req.body
    const genreId = parseInt(req.params.genreId)

    if (!name) {
        return res.status(400).send({message: "No name"})
    }

    if (!genreId) {
        res.status(400).send({message: "No genreId"})
    }

    try {
        const genreUpdated = await prisma.$transaction( async (prisma) => {
        const newGenreUpdated = await prisma.genres.update({
            where: {id: genreId},
            data: {name}
        })
        return newGenreUpdated;
    })
        res.status(201).send({
            type: "array",
            msg: "Genre updated",
            data: genreUpdated
        })
    } catch (error) {
        res.status(400).send({message: "No genre updated", error})
    }
}

export const deleteGenre = async (req: Request, res: Response) => {
    const genreId = parseInt(req.params.genreId)
    try {
        const genreDeleted = await prisma.genres.delete({
            where: {id: genreId}
        })
        res.status(201).send(genreDeleted)
    } catch (error) {
        res.status(400).send(error)
    }
    
}
