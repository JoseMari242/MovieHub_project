import { Schema, model } from "mongoose";

interface IGenreSchema {
    name: string,
}


const genreSchema = new Schema<IGenreSchema> ({
    name: {
        type: String,
        required:true
    }

});


const genreModel = model<IGenreSchema>("Genre", genreSchema)

export default genreModel;  