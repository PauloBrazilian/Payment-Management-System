import router from '@adonisjs/core/services/router'

const ProductsController = () => import('#controllers/products_controller')

router
  .group(() => {
    router.get('/', [ProductsController, 'index'])
    router.post('/', [ProductsController, 'create'])
    router.get('/:id', [ProductsController, 'show'])
    router.put('/:id', [ProductsController, 'update'])
    router.delete('/:id', [ProductsController, 'destroy'])
  })
  .prefix('/products')
