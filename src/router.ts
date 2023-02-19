import { Router } from 'express'

const router = Router()

// All are API Routes 

router.get('/products', (req, res) => {

    res.status(200)
    res.json({
        message: "All Products"
    })
}) //get products details


router.post('/product', () => { }) // create product
router.get('/product/:id', () => { }) // single product details
router.put('/products/:id', () => { }) // update single product
router.delete('/products/:id', () => { }) // delete single product

router.get('/updates', () => { }) //get updates details
router.post('/update', () => { }) // create update
router.get('/update/:id', () => { }) // single update details
router.put('/update/:id', () => { }) // update single update
router.delete('/update/:id', () => { }) // delete single update

router.get('/updatepoints', () => { }) //get updates details
router.post('/updatepoint', () => { }) // create update
router.get('/updatepoint/:id', () => { }) // single update details
router.put('/updatepoint/:id', () => { }) // update single update
router.delete('/updatepoint/:id', () => { }) // delete single update


export default router