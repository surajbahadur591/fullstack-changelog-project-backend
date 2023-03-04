import prisma from "../db"

export const createProduct = async (req, res, next) => {

    try {
        const product = await prisma.product.create({
            data: {
                Name: req.body.name,
                belongsToID: req.user.id

            }
        })
        res.json({ data: product })
    } catch (error) {
        next(error)
    }



}

// getting all products of a particular user 
export const getProducts = async (req, res, next) => {


    try {
        const user = await prisma.user.findUnique({

            
            where: {
                id: req.user.id
            },
            include: {
                products: true,
            }
        })

        res.json({ data: user.products })

    } catch (error) {
        next(error)
    }


}

// get single product 
export const getAProdcut = async (req, res) => {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id: id,
            belongsToID: req.user.id
        }
    })

    res.json({ data: product })
}

// update single query and always send result 
export const updateProduct = async (req, res) => {

    const updatedProduct = await prisma.product.update({
        where: {
            id_belongsToID: {
                id: req.params.id,
                belongsToID: req.user.id
            }
        },
        data: {
            Name: req.body.name
        }
    })

    res.json({ data: updatedProduct })

}

export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id_belongsToID: {
                    id: req.params.id,
                    belongsToID: req.user.id
                }
            }
        })
        res.json({ data: deletedProduct })

    } catch (error) {
        error.type = 'noproduct'
        next(error)
    }

}