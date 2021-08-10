const { Books, Students } = require('../models')

module.exports = class BooksController {
  static async create(req, res) {
    const {name} = req.body

    await Students.create({name})
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async findAll(req, res) {
    await Students.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async findOne(req, res) {
    const id = req.params.id

    if (!id) res.status(404).send('No ID provided')

    await Students.findByPk(id, {
      attributes: {exclude: ['createdAt', 'updatedAt']},
      include: {
        model: Books,
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err))
  }

  static async updateName(req, res) {
    const id = req.params.id
    const {name} = req.body

    if (!id) res.status(404).send('No ID provided')

    await Students.update({name}, {where: {id}})
      .catch(err => res.send(err))

      await Students.findByPk(id, {
        attributes: {exclude: ['createdAt', 'updatedAt']},
      })
        .then(data => res.status(200).json(data))
        .catch(err => res.send(err))
  }

  static async destroy(req, res) {
    const id = req.params.id

    if (!id) res.status(404).send('No ID provided')

    await Students.destroy({
      where: {
        id
      }
    })
      .then(data => {
        if (data > 0) res.status(200).json(data)
        else res.status(404).send('No Student has been deleted!')
      })
      .catch(err => res.send(err))
  }


}