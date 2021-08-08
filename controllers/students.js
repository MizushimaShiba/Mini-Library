const { Books, Students } = require('../models')

module.exports = class BooksController {
  static create(req, res) {
    const {name} = req.body

    Students.create({name})
      .then(data => res.status(200).json(data))
      .catch(err => res.error(err))
  }

  static findAll(req, res) {
    Students.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.error(err))
  }

  static findOne(req, res) {
    const id = req.params.id

    if (!id) res.status(404).send('No ID provided')

    Students.findByPk(id)
      .then(data => res.status(200).json(data))
      .catch(err => res.error(err))
  }

  static updateName(req, res) {
    const id = req.params.id
    const {name} = req.body

    if (!id) res.status(404).send('No ID provided')

    Students.update({name}, {where: {id}})
      .then(data => res.status(200).json(data))
      .catch(err => res.error(err))
  }

  static destroy(req, res) {
    const id = req.params.id

    if (!id) res.status(404).send('No ID provided')

    Students.destroy({
      where: {
        id
      }
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.error(err))
  }


}