const db = require('../models')
const Product = db.products

exports.findAll = (req, res) => {
    Product.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Table not Found'
            })
        })
}

exports.create = (req, res) => {
    console.log(req.body)
    if(!req.body.name || !req.body.photo) {
      res.status(400).send({
        message: 'Name & Photo are mandatory!'
      })
      return // permet que ca arrete ici
    }
    Product.create(req.body)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not insert Product in Database...'
        })
      })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Product.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "could not find the data"
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Product.update(req.body, {
    where: {id:id}
  })
  .then(num => {
    if(num == 1) {
      res.send({
        message: 'Product Updated'
      })
    } else {
      res.send({
        message: 'Could not Update Product...'
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Database Error'
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  console.log('Deleting product with ID:', id)
  Product.destroy({
    where: {id:id}
  })
  .then(num => {
    if(num == 1) {
      res.send({
        message: 'Product was deleted'
      })
    } else {
      res.send({
        message: 'Could not Delete Product...'
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Database Error'
    })
  })
}
