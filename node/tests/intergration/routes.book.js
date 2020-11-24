import { app } from '~/app'

import { connectDatabase, clearDatabase, closeDatabase } from '~/tests/db-handler'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('routes : books', () => {
  before(async () => {
    await connectDatabase()
    console.log('before')
  })

  afterEach(async () => {
    await clearDatabase()
    console.log('afterEach')
  })
  after(async () => {
    await closeDatabase()
    console.log('after')
  })

  describe('GET /books', () => {
    it('should respond with all books', (done) => {
      chai.request(app)
        .get('/books')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('array')
          res.body.length.should.eql(0)
          // res.body[0].should.include.keys(
          //   '_id', 'author', 'content', 'createdAt', 'publishedAt', 'title'
          // )
          done()
        })
    })
  })
})
