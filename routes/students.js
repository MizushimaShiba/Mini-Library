const router = require('express').Router()
const StudentsController = require('../controllers/students')

router.get('/books', StudentsController.findAll)
router.post('/books', StudentsController.create)
router.put('/books/:id', StudentsController.updateName)
router.get('/books/:id', StudentsController.findOne)
router.delete('/books/:id', StudentsController.destroy)



module.exports = router