import app from "./server";
import config from "./config/config";
import connect from "./db/db";


const PORT = config.app.PORT

connect().then(() =>

app.listen(PORT, () => console.log (`Server is running on ${PORT} and is connect to a db`))
)