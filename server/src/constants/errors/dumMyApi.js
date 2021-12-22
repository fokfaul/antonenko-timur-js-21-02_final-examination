const errors = {
    "APP_ID_NOT_EXIST": "app-id header is found but the value is not valid.",
    "APP_ID_MISSING": "app-id header is not set correctly. Note that you need to set app-id header for each request."+
    " Getting Started page for more info.",
    "PARAMS_NOT_VALID": "URL params (ex: /user/{id} - {id} is URL param) is not valid. This error returned in both "+
    "cases: param format is invalid, param is not found.",
    "BODY_NOT_VALID": "Applicable only for not GET requests like POST, PUT or DELETE. Boyd format is invalid,"+
    " or even some keys are not valid.",
    "RESOURCE_NOT_FOUND": "Applicable for all requests that has {id} URL param. Mean that item that was"+
    " requested(for get, update, delete) is not found. Works correctly if you try to create a post for user that"+
    " not exist or deleted.",
    "PATH_NOT_FOUND": "Request path is not valid, check controller documentation to validate the URL.",
    "SERVER_ERROR": "Something is wrong with server, try again later."
};

exports.apiError = (error) => {
    return errors[error] ? errors[error] : error;
}