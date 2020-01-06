import express from "express";
import d2s from "./v1/d2s.routes";
import img from "./v1/img.routes";
import config from "./v1/config.routes";

let router: express.Router = express.Router();

router.use("/v1/d2s", d2s);
router.use("/v1/img", img);
router.use("/v1/config", config);


export default router;