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