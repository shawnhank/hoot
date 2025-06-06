const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/hoots');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/hoots'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/hoots (INDEX action)
router.get('/', hootsCtrl.index);

// POST /api/hoots (CREATE action)
router.post('/', hootsCtrl.create);

// GET /api/hoots (SHOW action)
router.get('/:hootId', hootsCtrl.show);

// GET /api/hoots (UPDATE action)
router.put('/:hootId', hootsCtrl.update);


module.exports = router;