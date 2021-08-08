const router = require('express').Router()
const StudentsController = require('../controllers/students')

router.get('/students', StudentsController.findAll)
router.post('/students', StudentsController.create)
router.put('/students/:id', StudentsController.updateName)
router.get('/students/:id', StudentsController.findOne)
router.delete('/students/:id', StudentsController.destroy)



module.exports = router