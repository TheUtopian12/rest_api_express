import { Request, Response } from 'express'
import Product from '../models/Product.model'



export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({

            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.json({ data: products })
    } catch (error) {
        console.error(error)
    }

}


export const getProductsById = async (req: Request, res: Response) => {
    try {
        console.log('Desde getId', req.params.id)
        const { id } = req.params
        const product = await Product.findByPk(id, {

            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({ data: product })

    } catch (error) {
        console.error(error)
    }

}


export const createProduct = async (req: Request, res: Response) => {

    try {
        const product = new Product(req.body)
        const saveProduct = await product.save()
        res.json({ data: saveProduct })
    } catch (error) {
        console.log(error)
    }


}


export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}


export const updateAvailability = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    product.avalability = req.body.avalability
    await product.save()



    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }


    await product.destroy()


    res.json({ data: 'Producto eliminado' })
}