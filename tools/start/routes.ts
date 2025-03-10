import router from '@adonisjs/core/services/router'

const transactionsController = () => import('#controllers/transactions_controller')

router
  .group(() => {
    router.post('/', [transactionsController, 'createTransaction'])
    router.post('/cart', [transactionsController, 'createCart'])
    router.post('/:transactionId/chargeback', [transactionsController, 'processChargeback'])
    router.get('/', [transactionsController, 'getAllTransactions'])
  })
  .prefix('/tools')
