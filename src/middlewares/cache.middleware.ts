const mcache = require('memory-cache');

const cache = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url
    const cachedBody = mcache.get(key)
    if (cachedBody) {
        console.log('Usou cache')
        return res.send(cachedBody)
    } else {
        console.log('Não usou cache')
        res.sendResponse = res.send
        res.send = (body) => {
            mcache.put(key, body, 20 * 1000);
            res.sendResponse(body)
        }
        next()
    }
}

module.exports = {
    cache
}
