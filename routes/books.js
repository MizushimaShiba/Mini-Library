const router = require('express').Router()
const BooksController = require('../controllers/books')

router.get('/books', BooksController.findAll)
router.post('/books', BooksController.createBooks)
router.put('/books/:id', BooksController.updateName)
router.get('/books/:id', BooksController.findOne)
router.delete('/books/:id', BooksController.destroy)


router.post('/books/borrow', BooksController.borrowBooks)
router.post('/books/return', BooksController.returnBooks)


module.exports = router