import express, {Request, Response} from "express"
import { MongoDatabase } from "./data/init";
import { envs } from "./config/envs";
import { IncidentModel } from "./data/models/incident.model";
import { AppRoutes } from "./presentation/routes";

const app = express();

(async () => await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB}))();
app.use(express.json())


app.use("/", AppRoutes.routes)

app.listen(envs.PORT, ()=>{
  console.log(`Server is running on port ${envs.PORT}`)
})

