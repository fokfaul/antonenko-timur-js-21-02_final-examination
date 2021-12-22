const format = require('string-format')
const logger = require('../logger')
const {apiError} = require('../constants/errors/dumMyApi')

exports.defaultResponse = (res, apiData, suc, err) => {
    if ('error' in apiData)
    {
        logger.info(format(err, 520, apiData))
        res.status(520).send({"error": apiError(apiData['error'])})
    }
    else
    {
        if(typeof apiData === 'object' && apiData !== null)
        {
            logger.info(format(suc, 200, JSON.stringify(apiData)))
            res.status(200).send(apiData)
        }
        else
        {
            logger.info(format(err, 520, apiData))
            res.status(520).send(apiData)
        }
    }
}
exports.defaultErrorResponse = (res, error, log) => {
    logger.info(format(log, 520, error))
    res.status(520).send(error)
}