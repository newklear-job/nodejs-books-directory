import { app } from '~/app'
import { connectDatabase, clearDatabase, closeDatabase } from '~/tests/db-handler'
import booksGenerator from '~/fakers/book'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('routes : books', () => {
  before(async () => {
    await connectDatabase()
    console.log('before')
  })

  beforeEach(async () => { // afterEach is not working for some reason.
    await clearDatabase()
    console.log('beforeEach')
  })
  after(async () => {
    await closeDatabase()
    console.log('after')
  })

  describe('GET /books', () => {
    it('should respond with all books', async () => {
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
        })
    })
  })

  describe('GET /books/:id', () => {
    it('should return book by id', async () => {
      const book = (await booksGenerator.generate(1))[0]
      chai.request(app)
        .get(`/books/${book._id}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id', 'author', 'content', 'createdAt', 'publishedAt', 'title'
          )
        })
    })
  })

  describe('POST /books', () => {
    it('it should not POST a book without pages field', async () => {
      const book = {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien'
      }
      chai.request(app)
        .post('/books')
        .send(book)
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Book validation failed: content: Path `content` is required., title: Path `title` (`The Lord of the Rings`) is longer than the maximum allowed length (20).')
        })
    })
  })

  describe('POST /books', () => {
    it('it should POST a book', async () => {
      const book = booksGenerator.createBookObject()
      chai.request(app)
        .post('/books')
        .send(book)
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id', 'author', 'content', 'createdAt', 'publishedAt', 'title'
          )
          res.body.title.should.eql(book.title)
        })
    })
  })

  describe('PUT /books/:id', () => {
    it('it should UPDATE a book given the id', async () => {
      const oldBook = (await booksGenerator.generate(1))[0]
      const newBook = { title: 'New book title', author: 'C.S. Lewis', publishedAt: '1990-10-10' }
      chai.request(app)
        .put(`/books/${oldBook._id}`)
        .send(newBook)
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id', 'author', 'content', 'createdAt', 'publishedAt', 'title'
          )
          res.body.title.should.eql(newBook.title)
          res.body.author.should.eql(newBook.author)
          res.body.publishedAt.should.eql(`${newBook.publishedAt}T00:00:00.000Z`)
          res.body.content.should.eql(oldBook.content)
        })
    })
  })

  describe('DELETE /books/:id ', () => {
    it('it should DELETE a book given the id', async () => {
      const oldBook = (await booksGenerator.generate(1))[0]
      chai.request(app)
        .delete(`/books/${oldBook._id}`)
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Book removed')
        })
    })
  })
})
