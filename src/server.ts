import express  from "express";
import userRouter from "./routes/user.routes";
import movieRoutes from "./routes/movie.routes";
// import genreRoutes from "./routes/genre.routes";
import cors from "cors";
import { checkJwtMiddleware } from "./middlewares/checkjwt.middlewares";
import fileUpload from "express-fileupload";
import { urlencoded } from "body-parser";


const app = express ();

app.use(cors());


app.use(urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: './upload' }));

app.use(express.json());
app.use("/user", checkJwtMiddleware, userRouter)
app.use("/movie", checkJwtMiddleware, movieRoutes )
// app.use("/genre", checkJwtMiddleware, genreRoutes )


export default app;