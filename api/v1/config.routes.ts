import express from "express";
import dotenv from "dotenv";

dotenv.config();

let router: express.Router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    VUE_APP_INV_WIDTH: process.env.VUE_APP_INV_WIDTH || 10,
    VUE_APP_INV_HEIGHT: process.env.VUE_APP_INV_HEIGHT || 4,
    VUE_APP_STASH_WIDTH: process.env.VUE_APP_STASH_WIDTH || 6,
    VUE_APP_STASH_HEIGHT: process.env.VUE_APP_STASH_HEIGHT || 8,
    VUE_APP_CUBE_WIDTH: process.env.VUE_APP_CUBE_WIDTH || 3,
    VUE_APP_CUBE_HEIGHT: process.env.VUE_APP_CUBE_HEIGHT || 4,
  });
});

export default router;