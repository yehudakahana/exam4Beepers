import  Express, { Router }  from "express";
import { createBeeper, deleteBeeper,  getAllBeepers, getBeeperById , updateBeeper, getBeepersByStatus} from "../controllers/beeperController.js";

const router : Router = Express.Router();



router.route("/").post(createBeeper);

router.route("/").get(getAllBeepers);

router.route("/:id").get(getBeeperById);

 router.route("/:id/status").put(updateBeeper);

router.route("/:id").delete(deleteBeeper);

 router.route("/status/:status").get(getBeepersByStatus);



export default router;