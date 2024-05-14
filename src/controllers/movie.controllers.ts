import {Request, Response} from "express"
import prisma from "../db/client";
import fs from 'fs-extra';
import { uploadImageCloudinary } from "../utils/cloudinary";




export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const allMovies = await prisma.movies.findMany({
            include: {
                genre: {
                    select: {
                        genre: true
                    }
                }
            }
        });

        res.status(200).send({
            type: "array",
            msn: "All movies",
            data: allMovies
        });

    } catch (error) {
        res.status(400).send(error);
    }
}




export const createMovie = async (req: Request, res: Response) => {
    const {name, score, genre} = req.body 
   
 
    const image = req.files?.image;
   
    let ScoreToNumber = parseInt(score)
    ScoreToNumber  = score;
    let GenreToNumber = parseInt(genre);
    GenreToNumber = genre
    const userId = parseInt(req.params.userId)

   if (!name || !image) {
    return res.status(400).send({message: "No name no image no score"})
   }

   if (!userId) {
    return res.status(400).send({message: "No user id"})
   }

   try {
    if (Array.isArray(image)) {
        console.log("estoy en el primer if")
        return res.status(400).json({
            msg: 'You can only upload one file per movie.'
        }) 
        
    } else {
        console.log("estoy en el else")
        const result = await uploadImageCloudinary(image.tempFilePath);
        const newMovie = await prisma.movies.create({
            data: {
                name,
                score,
                genre,
                image: await result.secure_url,
                public_id_image: await result.public_id,
                userId
            },
        });
        console.log({newMovie})
        await fs.unlink(image.tempFilePath);
        return res.status(201).send({
            msg: 'New movie created',
            data: newMovie
        })
    }

} catch (error) {
     res.status(400).send(error)

}
}
    // const movie = await prisma.$transaction( async (prisma) => {
    // const newMovie = await prisma.movies.create({
    //     data: {
    //         name,
    //         image,
    //         score,
    //         userId,
    //     }
    // })
    
    // if(genre && genre.length) {
    //     const createGenres = genre.map((genreId: number) => ({
    //         movieId: newMovie.id, 
    //         genreId: genreId
    //     }));

    // await prisma.movieGenre.createMany({
    //     data: createGenres       
    // });
    // }
    // return prisma.movies.findUnique({
    //     where: {id: newMovie.id},
    //     include: {
    //         genre: true
    //     }
    // })
    // });

    // res.status(201).send({
    //     message: "Create movie",
    //     data: movie
    // })
   



export const updateMovie = async (req: Request, res: Response) => {
    const { name, image, score, genre } = req.body;
    const movieId = parseInt(req.params.movieId);

    if (!name && !image && !score && !genre) {
        return res.status(400).send({ message: "Falta información" });
    }

    if (!movieId) {
        return res.status(400).send({ message: "Falta el ID de la película" });
    }

    try {
        const movieUpdated = await prisma.$transaction(async (prisma) => {
            const updatedMovie = await prisma.movies.update({
                where: { id: movieId },
                data: { name, image, score },
                include: {
                    genre: true
                }
            });

            if (genre && genre.length) {
                const updateGenre = genre.map((genreId: number) => ({
                    movieId: updatedMovie.id, 
                    genreId: genreId
                }));

                await prisma.movieGenre.createMany({
                    data: updateGenre
                });
            }

            return updatedMovie;
        });

        res.status(200).send(movieUpdated);
    } catch (error) {
        res.status(500).send({ message: "Hubo un error al actualizar la película", error });
    }
}


export const deleteMovie = async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.movieId)
    try {
        const movieDeleted = await prisma.movies.delete({
            where: {id: movieId}
        })
        res.status(201).send(movieDeleted)
    } catch (error) {
        res.status(400).send(error)
    }
}
