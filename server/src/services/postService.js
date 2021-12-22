const logger = require('../logger')
const format = require('string-format')
const { postService: messages } = require('../constants/loggerMessages')
const {doGetRequest, doPostRequest, doPutRequest} = require('../api/dumMyApi')
const { POST_URL } = require('../constants/api/dumMyApi')
const {apiError} = require('../constants/errors/dumMyApi')
const {defaultResponse, defaultErrorResponse} = require('./common')
const {dateDMT, dateMDY} = require('../hooks/date')

class PostService {
  getPostList(req, res) {
    logger.info(format(messages.GET_POST_LIST_INPUT_PARAMS, req.query.page, req.query.limit))
    doGetRequest(POST_URL, req.query).then((apiData) => {
        if ('error' in apiData)
        {
            logger.info(format(messages.GET_POST_LIST_ERROR, 520, apiData))
            res.status(520).send({"error": apiError(apiData['error'])})
        }
        else
        {
            logger.info(format(messages.GET_POST_LIST_SUCCESS, 200, apiData))
            apiData.data = apiData.data.map((elem)=> {
                elem.publishDate = dateDMT(elem.publishDate, req.headers['accept-language']);
                return elem;
            })
            res.status(200).send(apiData)
        }
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_POST_LIST_ERROR)});
  }
  getPostById(req, res) {
    logger.info(format(messages.GET_POST_INPUT_PARAMS, req.params.id))
    doGetRequest(`${POST_URL}/${req.params.id}`).then((apiData) => {
        if ('error' in apiData)
        {
            logger.info(format(messages.GET_POST_ERROR, 520, apiData))
            res.status(520).send({"error": apiError(apiData['error'])})
        }
        else
        {
            logger.info(format(messages.GET_POST_SUCCESS, 200, apiData))
            apiData.publishDate = dateMDY(apiData.publishDate, req.headers['accept-language']);
            res.status(200).send(apiData)
        }
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_POST_LIST_ERROR)});;
  }
  getPostComment(req, res) {
    logger.info(format(messages.POST_COMMENT_INPUT_PARAMS, req.params.id, req.query))
    doGetRequest(`${POST_URL}/${req.params.id}/comment`, req.body).then((apiData) => {
        if ('error' in apiData)
        {
            logger.info(format(messages.POST_COMMENT_ERROR, 520, apiData))
            res.status(520).send({"error": apiError(apiData['error'])})
        }
        else
        {
            logger.info(format(messages.POST_COMMENT_SUCCESS, 200, apiData))
            apiData.data = apiData.data.map((elem)=> {
                elem.publishDate = dateDMT(elem.publishDate, req.headers['accept-language']);
                return elem;
            })
            res.status(200).send(apiData)
        }
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_POST_LIST_ERROR)});;
  }
}

module.exports = new PostService()