import {Request, Response} from "express"
import prisma from "../db/client";
import UserModel from "../models/user.models"
import genreModel from "../models/genre.models"
import movieModel from "../models/movie.models"


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
        // Verificar si ya existe un género con el mismo nombre
        const existingGenre = await prisma.genres.findFirst({
            where: { name: name }
        });
        if (existingGenre) {
            // Si ya existe, devolver un mensaje de error
            return res.status(400).send({ message: "The genre already exists" });
        }

        // Si no existe, crear el nuevo género
        const newGenre = await prisma.genres.create({
            data: { name }
        });

        // Enviar respuesta con el nuevo género creado
        res.status(201).send({
            type: typeof newGenre,
            msg: "Genre created successfully",
            data: newGenre,
        });
    } catch (error) {
        // Capturar cualquier error y enviar una respuesta de error
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

// import {Request, Response} from "express"
// import prisma from "../db/client";


// export const getAllGenres = async (req: Request, res: Response) => {
//     try {
//         const allGenres = await prisma.genres.findMany()

//         res.status(200).send({
//             type: "array",
//             msg: "All genres",
//             data: allGenres
//         })

//     } catch (error) {
//         res.status(500).send({message: "Internal server error"})
//     }
// }

// export const createGenre = async (req: Request, res: Response) => {
//    const {name} = req.body
//    if(!name){
//     return res.status(400).send({message: "Error"})
//    }
//    try {
//     const genreCreated = await prisma.genres.create({

//         data: {
//             name: name
//         }
//     })
//     res.status(201).send({
//         type: typeof genreCreated,
//         msg: "Genre created",
//         data: genreCreated
//     })
//    } catch (error) {

//    }
// }

// export const updateGenre = async (req: Request, res: Response) => {
//     const {name} =  req.body
//     const genreId = parseInt(req.params.genreId)
//     try {
//         const genreUpdated = await prisma.genres.update({
//             where: {id: genreId},
//             data: {name}
//         })
//         res.status(201).send(genreUpdated)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

// export const deleteGenre = async (req: Request, res: Response) => {
//     const genreId = parseInt(req.params.genreId)
//     try {
//         const genreDeleted = await prisma.genres.delete({
//             where: {id: genreId}
//         })
//         res.status(201).send(genreDeleted)
//     } catch (error) {
//         res.status(400).send(error)
//     }

// }