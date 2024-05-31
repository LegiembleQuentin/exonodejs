const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const relationController = require('../controllers/relation.controller');
const auth = require('../middleware/auth');

router.post('/create', [
    auth,
    check('user2', 'User2 is required').notEmpty()
], relationController.createRelation);

router.get('/relations', auth, relationController.getRelations);

module.exports = router;
