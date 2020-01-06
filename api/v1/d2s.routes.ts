import express from "express";
import path from "path";
import fs from "fs";
import { read, readConstantData, types } from "d2s";
import dotenv from "dotenv";
import glob from "glob";

dotenv.config();

let router: express.Router = express.Router();
let c: types.IConstantData;

/*
* Load up constant data when start server
*/
(async () => {
    let base = process.env.MPQ_DATA_DIR as string;
    let files = {} as any;
    let dir = path.join(`${base}/global/excel/`);
    try {
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith(".txt")) {
                files[file] = fs.readFileSync(path.join(dir, file), 'utf8');
            }
        });
        dir = path.join(`${base}/local/LNG/ENG/`);
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith(".txt")) {
                files[file] = fs.readFileSync(path.join(dir, file), 'utf8');
            }
        });
        c = await readConstantData(files);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

router.get("/character/:character", async (req, res) => {
    try {
        const base = process.env.SAVE_DIR as string;
        const files = await glob.sync(path.join(base, `**/${req.params.character}?(.d2s)`), { nodir: true, nocase: true });
        if(!files.length) {
            throw new Error(`${req.params.character} save not found.`);
        }
        const buffer = fs.readFileSync(files[0]);
        const s = await read(buffer, c, { extendedStash: process.env.EXTENDED_STASH == "true"});
        res.json(s);
    } catch (e) {
        console.log(e);
    }
});

router.get("/list", async (req, res) => {
    const base = process.env.SAVE_DIR as string;
    const files = await glob.sync(path.join(base, `**`), { nodir: true }).map(file => path.basename(file, '.d2s'));
    res.json(files);
});

export default router;