const request = require('supertest')
const app = require('../../src/app').app
const {doGetRequest, doPostRequest, doPutRequest} = require('../../src/api/dumMyApi')
jest.mock('../../src/api/dumMyApi')

const expectedId = '435345234afadfgawe'
const user =
{
    name: 'Oleg',
    lastName: 'Ivanov',
    expectedId: expectedId
}

describe('users router', () => {

  test('getUserList: should return user list', async () => {
    const usersList =
    {
      data: [{
        name: 'Andreas',
        lastName: 'Valent',
        type: 1
      }, {
        name: 'Oleg',
        lastName: 'Ivanov',
        type: 2
      }]
    }
    doGetRequest.mockResolvedValue(usersList)
    const result = await request(app)
      .get('/user')
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(usersList))
  })

  test('getUserList: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doGetRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .get('/user')
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('getUserList: fetch to simpleApi error. Should return error', async () => {
    const errorDesc = 'FETCH ERROR'
    doGetRequest.mockRejectedValue(errorDesc)
    const result = await request(app)
      .get('/user')
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(errorDesc)
  })

  test('getUserById: should return user', async () => {
    doGetRequest.mockResolvedValue(user)
    const result = await request(app)
      .get('/user/'+expectedId)
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(user))
  })

  test('getUserById: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doGetRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .get('/user/'+expectedId)
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('editUserById: should return user', async () => {
    doPutRequest.mockResolvedValue(user)
    const result = await request(app)
      .put('/user/'+expectedId)
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(user))
  })

  test('editUserById: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doPutRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .put('/user/'+expectedId)
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('createUser: should return id of created user', async () => {
    const resPost = {
      status: 'ok',
      id: expectedId
    }
    doPostRequest.mockResolvedValue(resPost)
    const result = await request(app)
      .post('/user/create')
      .send({
        name: 'Any',
        lastName: 'anyLastName'
      })
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(resPost))
  })

  test('createUser: fetch simpleApi error', async () => {
    doPostRequest.mockRejectedValue('ERROR')
    const result = await request(app)
      .post('/user/create')
      .send({
        name: 'Any',
        lastName: 'anyLastName'
      })
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual("ERROR")
  })

  test('getUserPost: should return user list', async () => {
    const postsList =
    {
      data: [{
        title: 'Andreas',
        text: 'Valent',
      }, {
        title: 'Oleg',
        text: 'Ivanov',
      }]
    }
    doGetRequest.mockResolvedValue(postsList)
    const result = await request(app)
      .get('/user/'+expectedId+"/post")
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(postsList))
  })

  test('getUserPost: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doGetRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .get('/user/'+expectedId+"/post")
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('getUserPost: fetch to simpleApi error. Should return error', async () => {
    const errorDesc = 'FETCH ERROR'
    doGetRequest.mockRejectedValue(errorDesc)
    const result = await request(app)
      .get('/user/'+expectedId+"/post")
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(errorDesc)
  })

})
