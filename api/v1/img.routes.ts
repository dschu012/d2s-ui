import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import jimp from "jimp";
import glob from "glob";

dotenv.config();

let router: express.Router = express.Router();

const palette = [] as any;
const mappings = [] as any;

const colormaps = {
    1: '/global/items/Palette/grey.dat',
    2: '/global/items/Palette/grey2.dat',
    5: '/global/items/Palette/greybrown.dat',
    6: '/global/items/Palette/invgrey.dat',
    7: '/global/items/Palette/invgrey2.dat',
    8: '/global/items/Palette/invgreybrown.dat',
};

const colors = {
    whit: 0,
    lgry: 1,
    dgry: 2,
    blac: 3,
    lblu: 4,
    dblu: 5,
    cblu: 6,
    lred: 7,
    dred: 8,
    cred: 9,
    lgrn: 10,
    dgrn: 11,
    cgrn: 12,
    lyel: 13,
    dyel: 14,
    lgld: 15,
    dgld: 16,
    lpur: 17,
    dpur: 18,
    oran: 19,
    bwht: 20,
};


const base = process.env.IMG_DATA_DIR as string || process.env.MPQ_DATA_DIR as string;
/*
* Load up constant data when start server
*/
(async () => {

    async function loadPalette(f: string) {
        const buffer = fs.readFileSync(path.join(base, f));
        for (let i = 0; i < 256; i += 1) {
            palette.push([buffer[i * 3 + 2], buffer[i * 3 + 1], buffer[i * 3]]);
        }
    };
    async function loadMapping(key: any, f: string) {
        const buffer = fs.readFileSync(path.join(base, f));
        const mapping = [];
        for (let i = 0; i < Object.keys(colors).length; i += 1) {
            mapping.push(buffer.slice(0 + (i * 256), 256 + (i * 256)));
        }
        mappings[key] = mapping;
    };

    try {
        loadPalette(`/global/palette/ACT1/pal.dat`);
        for(const key in colormaps) {
            loadMapping(key, colormaps[key]);
        }
    } catch(e) {
        console.log(e);
        process.exit(1);
    }
})();


router.get("/:file.png", async (req, res) => {
    try {
        //we only care about first frame
        const files = await glob.sync(path.join(base, '/global/items', `${req.params.file}.dc6`), { nodir: true, nocase: true });
        if(files.length === 0) {
            throw new Error(`File not found ${req.params.file}.dc6`);
        }
        const dc6 = fs.readFileSync(files[0]);
        const width = dc6.readUInt32LE(32);
        const height = dc6.readUInt32LE(36);
        const length = dc6.readUInt32LE(56);
        let x = 0, y = height - 1;
        const indexed = [] as any;
        for (let i = 0; i < height; i += 1) {
            indexed[i] = Array(width).fill(255);
        }
        for (let i = 0; i < length;) {
            let b = dc6.readUInt8(60 + i++);
            if (b === 0x80) { //eol
                x = 0, y--;
            } else if (b & 0x80) {
                x += b & 0x7F; //transparent repeat for N bytes
            } else {
                //read N bytes
                for(let j = 0; j < b; j++) {
                    indexed[y][x++] = dc6.readUInt8(60 + i++);
                }
            }
        }
        new jimp(width, height, async function (err, image) {
            let data = image.bitmap.data;
            for (let y = 0; y < height; y += 1) {
                for (let x = 0; x < width; x += 1) {
                    let paletteIdx = indexed[y][x];
                    const offset = (y * width + x) * 4;
                    if(paletteIdx === 255) { //transparent
                        continue;
                    }
                    if(req.query.inv_transform && req.query.transform_color) {
                        let transformIdx = colors[req.query.transform_color];
                        if(transformIdx >= 0 && mappings[req.query.inv_transform]) {
                            paletteIdx = mappings[req.query.inv_transform][transformIdx][paletteIdx];
                        }
                    }
                    const rgb = palette[paletteIdx];
                    data[offset] = rgb[0];
                    data[offset + 1] = rgb[1];
                    data[offset + 2] = rgb[2];
                    data[offset + 3] = 255;
                }
            }
            let buffer = await image.getBufferAsync(jimp.MIME_PNG);
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31557600, s-maxage=31557600' 
            });
            res.end(buffer, 'binary');
        })
    } catch (e) {
        console.log(e);
        res.writeHead(404);
        res.end();
    }
});

export default router;