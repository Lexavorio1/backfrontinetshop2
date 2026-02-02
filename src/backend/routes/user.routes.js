const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')
const controller = require('../controllers/user.controller')

router.get('/me', auth, controller.getMe)

router.get(
  '/',
  auth,
  role('admin', 'developer'),
  controller.getUsers
)

router.put('/cart', auth, controller.updateCart)
router.put('/favorites', auth, controller.updateFavorites)

/* ====== НАКАЗАНИЯ ====== */

router.post(
  '/punish/:id',
  auth,
  role('admin', 'developer'),
  controller.punishUser
)

router.post(
  '/unpunish/:id',
  auth,
  role('admin', 'developer'),
  controller.unPunishUser
)

/* ====== РОЛИ ====== */

router.patch(
  '/role/:id',
  auth,
  role('developer'),
  controller.changeRole
)

module.exports = router
