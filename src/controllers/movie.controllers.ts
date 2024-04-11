import {Request, Response} from "express"
import prisma from "../db/client";


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
    
    console.log("required body", req.body) 
    const {name, image, score, genre} = req.body
    
   const userId = parseInt(req.params.userId)

   if (!name || !image || !score) {
    return res.status(400).send({message: "No name no image"})
   }

   if (!userId) {
    return res.status(400).send({message: "No user id"})
   }

   try {

    const movie = await prisma.$transaction( async (prisma) => {
    const newMovie = await prisma.movies.create({
        data: {
            name,
            image,
            score,
            userId,
        }
    })
    
    if(genre && genre.length) {
        const createGenres = genre.map((genreId: number) => ({
            movieId: newMovie.id, 
            genreId: genreId
        }));

    await prisma.movieGenre.createMany({
        data: createGenres       
    });
    }
    return prisma.movies.findUnique({
        where: {id: newMovie.id},
        include: {
            genre: true
        }
    })
    });

    res.status(201).send({
        message: "Create movie",
        data: movie
    })
   


   } catch (error) {
        res.status(400).send(error)

   }
}

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
            // Actualizar la información de la película
            const updatedMovie = await prisma.movies.update({
                where: { id: movieId },
                data: { name, image, score },
                include: {
                    genre: true
                }
            });

            // Actualizar los géneros asociados con la película
            if (genre && genre.length) {
                const updateGenre = genre.map((genreId: number) => ({
                    movieId: updatedMovie.id, // Utilizamos updatedMovie para obtener el ID actualizado de la película
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
