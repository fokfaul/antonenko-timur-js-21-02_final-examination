module.exports = {
  userService: {
    GET_USER_LIST_INPUT_PARAMS: '[UserService.getUserList] page={} limit={}',
    GET_USER_LIST_SUCCESS: '[UserService.getUserList] success status={} response={}',
    GET_USER_LIST_ERROR: '[UserService.getUserList] error status={} response={}',

    GET_USER_INPUT_PARAMS: '[UserService.getUserById] id={}',
    GET_USER_SUCCESS: '[UserService.getUserById] success status={} response={}',
    GET_USER_ERROR: '[UserService.getUserById] error status={} response={}',

    EDIT_USER_INPUT_PARAMS: '[UserService.editUserById] id={} body={}',
    EDIT_USER_SUCCESS: '[UserService.editUserById] success status={} response={}',
    EDIT_USER_ERROR: '[UserService.editUserById] error status={} response={}',

    CREATE_USER_INPUT_PARAMS: '[UserService.createUser] INPUT PARAMS body={}',
    CREATE_USER_SUCCESS: '[UserService.createUser] success status={} response={}',
    CREATE_USER_ERROR: '[UserService.createUser] error status={} response={}',

    USER_POST_INPUT_PARAMS: '[UserService.getUserPost] id={} query={}',
    USER_POST_SUCCESS: '[UserService.getUserPost] success status={} response={}',
    USER_POST_ERROR: '[UserService.getUserPost] error status={} response={}',
  },
  postService: {
    GET_POST_LIST_INPUT_PARAMS: '[UserService.getPostList] page={} limit={}',
    GET_POST_LIST_SUCCESS: '[UserService.getPostList] success status={} response={}',
    GET_POST_LIST_ERROR: '[UserService.getPostList] error status={} response={}',

    GET_POST_INPUT_PARAMS: '[UserService.getPostById] id={}',
    GET_POST_SUCCESS: '[UserService.getPostById] success status={} response={}',
    GET_POST_ERROR: '[UserService.getPostById] error status={} response={}',

    POST_COMMENT_INPUT_PARAMS: '[UserService.getPostComment] id={} query={}',
    POST_COMMENT_SUCCESS: '[UserService.getPostComment] success status={} response={}',
    POST_COMMENT_ERROR: '[UserService.getPostComment] error status={} response={}',
  }
}
