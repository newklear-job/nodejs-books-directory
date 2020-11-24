import '~/config/tests' // Attention! Sets test environment, which is used to change db connection.
import { app } from '~/app'
import { Book } from '~/models/book'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('routes : books', () => {
  beforeEach((done) => { // Before each test we empty the database
    Book.deleteMany({}, (err) => {
      console.error(err)
    })
    done()
  })

  afterEach((done) => {
    console.log('after')
    done()
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
