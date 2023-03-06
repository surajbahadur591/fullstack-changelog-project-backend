import { body } from 'express-validator';
import { createJWT } from './../modules/auth';
import prisma from "../db"

export const getUpdates = async (req, res, next) => {

    try { 
        const prod = await prisma.product.findMany({
            where: {
                belongsToID: req.user.id
            },
            include: {
                updates: true
            }
        })
    
    
        const updates = prod.reduce((allup, prod) => {
            return [...allup, ...prod.updates]
        }, [])
        res.json({ updates })
    }
    catch(e) {
        next(e)
    }
}

export const getSingleUpdates = async (req, res) => {
    const singleUpdate = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: singleUpdate })
}

export const addUpdates = async (req, res, next) => {

    try {
        // const {productId, ...rest} = req.body
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    })

    if (!product) {
        res.json({ message: "not valid" })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            productto: { connect: { id: product.id } }
        }
    })


    res.json({ data: update })
        
    } catch (error) {
        next(error)
    }
    
}

export const modifyUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToID: req.user.id,

        },
        include: {
            updates: true
        }
    })

    // console.log(products)


    const updates = products.reduce((allup, prod) => {
        return [...allup, ...prod.updates]
    }, [])


    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.json({ message: 'nope' })

    }
    const uploadUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },

        data: req.body
    })

    res.json({ data: uploadUpdate })
}

export const deleteUpdates = async (req, res, next) => {

    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToID: req.user.id,
    
            },
            include: {
                updates: true
            }
        })
    
    
        const updates = products.reduce((allup, prod) => {
            return [...allup, ...prod.updates]
        }, [])
    
    
        const match = updates.find(update => update.id === req.params.id)
    
        if (!match) {
            res.json({ message: 'nope' })
    
        }
    
        const deleted = await prisma.update.delete({
            where: {
                id: req.params.id
            }
        })
    
        res.json({ data: deleted })
        
    } catch (error) {
        next(error)
    }
    
}