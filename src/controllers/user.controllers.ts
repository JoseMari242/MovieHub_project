import {Request, Response} from "express"

export const getAllUsers = (req: Request, res: Response) => {
    res.send("Hola desde controller")
}

export const createUser = (req: Request, res: Response) => {
    res.send("User created")
}

export const updateUser = (req: Request, res: Response) => {
    res.send("User updated")
}

export const deleteUser = (req: Request, res: Response) => {
    const {userId} = req.params
    res.send(`User with ID "${userId}" has been deleted`)
}