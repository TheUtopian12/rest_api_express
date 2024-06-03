import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()


router.get('/', getProducts)
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById)

router.post('/',

    //Validacion
    body('name').notEmpty().withMessage('Nombre de producto no puede ir vacio'),
    body('price').isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('Precio de producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,

    createProduct


)
router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('Nombre de producto no puede ir vacio'),
    body('price').isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('Precio de producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('avalability').isBoolean().withMessage('Disponibilidad no valida'),
    handleInputErrors,

    updateProduct)
router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)


router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)


export default router