import express  from "express";
import userRouter from "./routes/user.routes";
import movieRoutes from "./routes/movie.routes";
// import genreRoutes from "./routes/genre.routes";
import cors from "cors";
import { checkJwtMiddleware } from "./middlewares/checkjwt.middlewares";
import fileUpload from "express-fileupload";
import { urlencoded, json } from "body-parser";


const app = express ();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: './upload' }));

app.use("/user", userRouter)
app.use("/movie", movieRoutes )
// app.use("/genre", checkJwtMiddleware, genreRoutes )


export default app;