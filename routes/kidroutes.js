const express = require('express'); 
const router = express.Router();
const auth = require('../auth'); 

const { getKids, getKid, postKids, makePayment } = require('../controllers/kidscontrollers')

router.get('/get', getKids)
router.post('/create', postKids)
router.get('/get/:id', getKid)
router.post('/order', auth, makePayment)

module.exports = router; 
