### D2S-UI

Barebones UI for displaying a d2s file.

![image](https://user-images.githubusercontent.com/1458109/92019197-390d4d00-ed24-11ea-93f1-7fd7333e3cc7.png)

You need to provide the images/txt data extracted from the MPQ as env variables:

* `MPQ_DATA_DIR` - path to extracted MPQ data.
* `IMG_DATA_DIR` - optional image directory instead of MPQ data directory.

##### Build
```
docker build . -t dschu012/d2s:latest
```

Run
```
docker run dschu012/d2s:latest \
    -p 8080:3030 \
    -e EXTENDED_STASH=true
    -v /path/to/saves:/data/saves:ro \
    -v /path/to/txt:/data/txt:ro \
    -v /path/to/img:/data/img:ro \
```

##### Examples
* https://diablo.dannyschumacher.com/#/
* https://resurgence.dannyschumacher.com/#/
