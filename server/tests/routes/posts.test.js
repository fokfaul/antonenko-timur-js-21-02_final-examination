const request = require('supertest')
const app = require('../../src/app').app
const {doGetRequest, doPostRequest, doPutRequest} = require('../../src/api/dumMyApi')
jest.mock('../../src/api/dumMyApi')

const expectedId = '435345234afadfgawe'
const post =
{
    title: 'FirstPost',
    text: 'Hello World!',
    expectedId: expectedId
}

describe('posts router', () => {

  test('getPostList: should return post list', async () => {
    const postsList =
    {
      data: [{
        title: 'FirstPost',
        text: 'Hello World!',
      }, {
        title: 'SecondPost',
        text: 'Goodbye World!',
      }]
    }
    doGetRequest.mockResolvedValue(postsList)
    const result = await request(app)
      .get('/post')
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(postsList))
  })

  test('getPostList: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doGetRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .get('/post')
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('getPostList: fetch to simpleApi error. Should return error', async () => {
    const errorDesc = 'FETCH ERROR'
    doGetRequest.mockRejectedValue(errorDesc)
    const result = await request(app)
      .get('/post')
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(errorDesc)
  })

  test('getPostById: should return post', async () => {
    doGetRequest.mockResolvedValue(post)
    const result = await request(app)
      .get('/post/'+expectedId)
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(post))
  })

  test('getPostById: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doGetRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .get('/post/'+expectedId)
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('getPostComment: should return comment list', async () => {
    const commentsList =
    {
      data: [{
        owner: 'Andreas',
        text: 'Excellent',
      }, {
        owner: 'Oleg',
        text: 'Nice',
      }]
    }
    doGetRequest.mockResolvedValue(commentsList)
    const result = await request(app)
      .get('/post/'+expectedId+"/comment")
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(commentsList))
  })

  test('getPostComment: simpleApi error. Should return error', async () => {
    const errorDesc = { error: 'SIMPLE API ERROR'}
    doGetRequest.mockResolvedValue(errorDesc)
    const result = await request(app)
      .get('/post/'+expectedId+"/comment")
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })

  test('getPostComment: fetch to simpleApi error. Should return error', async () => {
    const errorDesc = 'FETCH ERROR'
    doGetRequest.mockRejectedValue(errorDesc)
    const result = await request(app)
      .get('/post/'+expectedId+"/comment")
      .send()
    expect(result.statusCode).toBe(520)
    expect(result.text).toEqual(errorDesc)
  })

})
