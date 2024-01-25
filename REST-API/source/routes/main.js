const express =  require('express')
const { getBooks,createBooks,updateBooks,deleteBooks } = require('../controllers/books_controller')
const authentication = require('../models/Authentication')
const { getCategory,createCategory,updateCategory,deleteCategory,
getCategoryBooks } = require('../controllers/category_controller')

const router = express.Router()

router.get('/categories', getCategory)
router.post('/categories',authentication,createCategory)
router.put('/categories/:id',authentication,updateCategory)
router.delete('/categories/:id',authentication,deleteCategory)
router.get('/categories/:id/books',getCategoryBooks)

router.get('/books',getBooks)
router.post('/books',authentication,createBooks)
router.put('/books/:id',authentication,updateBooks)
router.delete('/books/:id',authentication,deleteBooks)


module.exports= router
