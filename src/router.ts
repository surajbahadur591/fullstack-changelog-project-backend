import { addUpdates, deleteUpdates, modifyUpdates, getUpdates, getSingleUpdates } from './handlers/updateHandler';
import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, deleteProduct, getAProdcut, getProducts, updateProduct } from './handlers/productHandler'

import { InputValidator } from './modules/middlewares'
const router = Router()

// All are API Routes 

router.get('/products', getProducts) //get products details
router.get('/product/:id', getAProdcut) // single product details
router.post('/product', body('name').isString(), InputValidator, createProduct) // create product
router.put('/product/:id', body('name').isString(), InputValidator, updateProduct) // update single product
router.delete('/product/:id', deleteProduct) // delete single product



router.get('/updates', getUpdates) //get updates details
router.get('/update/:id', getSingleUpdates) // single update details
router.post('/update', body('title').exists().isString(), body('body').exists().isString(), body('productId').exists().isString(), addUpdates) // create update
router.put('/update/:id', body('title').optional, body('body').optional, body('version').optional, body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(), modifyUpdates) // update single update
router.delete('/update/:id', deleteUpdates) // delete single update


router.get('/updatepoints', () => { }) //get updates details
router.get('/updatepoint/:id', () => { }) // single update details
router.post('/updatepoint',
    body('name').isString,
    body('description').isString(),
    body('updateID').exists().isString()
    , () => { }) // create update

router.put('/updatepoint/:id',
    body('name').optional().isString,
    body('description').optional().isString()

    , () => { }) // update single update
router.delete('/updatepoint/:id', () => { }) // delete single update


export default router