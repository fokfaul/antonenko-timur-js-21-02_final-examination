const logger = require('../logger')
const format = require('string-format')
const { userService: messages } = require('../constants/loggerMessages')
const {doGetRequest, doPostRequest, doPutRequest} = require('../api/dumMyApi')
const { USER_URL, POST_URL } = require('../constants/api/dumMyApi')
const {apiError} = require('../constants/errors/dumMyApi')
const {defaultResponse, defaultErrorResponse} = require('./common')
const {dateMDY} = require('../hooks/date')

class UserService {
  getUserList(req, res) {
    logger.info(format(messages.GET_USER_LIST_INPUT_PARAMS, req.query.page, req.query.limit))
    doGetRequest(USER_URL, req.query).then((apiData) => {
        defaultResponse(res, apiData, messages.GET_USER_LIST_SUCCESS, messages.GET_USER_LIST_ERROR)
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_USER_LIST_ERROR)});
  }
  getUserById(req, res) {
    logger.info(format(messages.GET_USER_INPUT_PARAMS, req.params.id))
    doGetRequest(`${USER_URL}/${req.params.id}`).then((apiData) => {
        if ('error' in apiData)
        {
            logger.info(format(messages.GET_USER_ERROR, 520, apiData))
            res.status(520).send({"error": apiError(apiData['error'])})
        }
        else
        {
            logger.info(format(messages.GET_USER_SUCCESS, 200, apiData))
            if(apiData.registerDate)
                apiData.registerDate = dateMDY(apiData.registerDate, req.headers['accept-language']);
            if(apiData.dateOfBirth)
                apiData.dateOfBirthView = dateMDY(apiData.dateOfBirth, req.headers['accept-language']);
            res.status(200).send(apiData)
        }
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_USER_LIST_ERROR)});
  }
  editUserById(req, res) {
    logger.info(format(messages.EDIT_USER_INPUT_PARAMS, req.params.id, req.body))
    doPutRequest(`${USER_URL}/${req.params.id}`, req.body).then((apiData) => {
        defaultResponse(res, apiData, messages.EDIT_USER_SUCCESS, messages.EDIT_USER_ERROR)
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_USER_LIST_ERROR)});
  }
  createUser(req, res) {
    logger.info(format(messages.CREATE_USER_INPUT_PARAMS, JSON.stringify(req.body)))
    doPostRequest(`${USER_URL}/create`, req.body).then((apiData) => {
        defaultResponse(res, apiData, messages.CREATE_USER_SUCCESS, messages.CREATE_USER_ERROR)
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_USER_LIST_ERROR)});
  }
  getUserPost(req, res) {
    logger.info(format(messages.USER_POST_INPUT_PARAMS, req.params.id, req.query))
    doGetRequest(`${USER_URL}/${req.params.id}/${POST_URL}`, req.query).then((apiData) => {
        defaultResponse(res, apiData, messages.USER_POST_SUCCESS, messages.USER_POST_ERROR)
    }).catch((error) => {defaultErrorResponse(res, error, messages.GET_USER_LIST_ERROR)});
  }
}

module.exports = new UserService()