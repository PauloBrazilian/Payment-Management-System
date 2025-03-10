import router from '@adonisjs/core/services/router'

const ClientControler = () => import('#controllers/clients_controller')

router
  .group(() => {
    router.get('/', [ClientControler, 'index'])
    router.get('/email/:email', [ClientControler, 'showEmail'])
    router.post('/', [ClientControler, 'create'])
    router.get('/:id', [ClientControler, 'show'])
    router.put('/:id', [ClientControler, 'update'])
    router.delete('/:id', [ClientControler, 'destroy'])
  })
  .prefix('/clients')
