const { Books, Students } = require('../models')
const moment = require('moment')

module.exports = class BooksController {
  static async createBooks(req, res) {
    const {name} = req.body

    await Books.create({bookName: name})
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async findAll(req, res) {
    await Books.findAll({
      include: {
        model: Students,
        attributes: ['name']
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: [
        ['id', 'ASC']
      ]
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async findOne(req, res) {
    const id = req.params.id

    if (!id) res.status(404).send('No ID provided')

    await Books.findByPk(id, {
      include: {
        model: Students,
        attributes: ['name']
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async updateName(req, res) {
    const id = req.params.id
    const {name} = req.body

    if (!id) res.status(404).send('No ID provided')

    await Books.update({bookName: name}, {where: {id}})
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async destroy(req, res) {
    const id = req.params.id

    if (!id) res.status(404).send('No ID provided')

    await Books.destroy({
      where: {
        id
      }
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async borrowBooks(req, res) {
    const {studentName, bookName} = req.body
    
    const book = await Books.findOne({where: {bookName}, attributes: {exclude: ['createdAt', 'updatedAt']}})
    const student = await Students.findOne({where: {name: studentName}})

    if (!book || !student) {
      res.send('Please find the correct Books or the correct Students')
    }

    if (!book.studentsId) {
      book.borrowedAt = moment()
      book.dueDate = moment().add(3, 'd')
      book.studentsId = student.id
      book.returnedAt = null
      
      await book.save({omitNull: false})
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
    } else {
      res.status('410').send('Books already borrowed')
    }
  }

  static async returnBooks(req, res) {
    const {studentName, bookName} = req.body
    
    const book = await Books.findOne({
      where: {bookName},
      attributes: {exclude: ['createdAt', 'updatedAt']},
      include: {
        model: Students,
        attributes: {exclude: ['createdAt', 'updatedAt']}
      },
    })
    const student = await Students.findOne({where: {name: studentName}})
    const dueDate = book.dueDate

    if (!book || !student) {
      res.send('Please find the correct Books or the correct Students')
    }

    if (book.studentsId === student.id) {
      if (moment() > moment(book.dueDate)) {
        student.totalFine = student.totalFine ? Math.abs((moment().diff(book.dueDate, 'days')) * 5000) + student.totalFine : Math.abs((moment().diff(book.dueDate, 'days')) * 5000)
        await student.save()
      }
      book.borrowedAt = null
      book.dueDate = null
      book.studentsId = null
      book.returnedAt = moment()
      
      await book.save({omitNull: false})
      .then(data => res.status(200).json({
        ...data.dataValues,
        totalFine: Math.abs((moment().diff(dueDate, 'days')) * 5000)
      }))
      .catch(err => res.send(err))

    } else {
      res.send('Wrong student!')
    }
  }


}