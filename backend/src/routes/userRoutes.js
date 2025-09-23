const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { authenticate, authorize } = require('../../middleware/auth');

router.post('/', authenticate, authorize(['ADMIN']), createUser);
router.get('/', authenticate, authorize(['ADMIN']), getUsers);
router.get('/:id', authenticate, authorize(['ADMIN']), getUserById);
router.put('/:id', authenticate, authorize(['ADMIN']), updateUser);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteUser);

module.exports = router;
