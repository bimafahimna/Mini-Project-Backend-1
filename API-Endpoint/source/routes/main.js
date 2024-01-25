const express =  require('express')
const { persegi, persegi_panjang,lingkaran } = require('../controllers/bangun_datar_controller')
const {kubus,balok,tabung} = require('../controllers/bangun_ruang_controller')
const router = express.Router()


router.get('/bangun-datar/persegi', persegi)
router.get('/bangun-datar/persegi-panjang',persegi_panjang)
router.get('/bangun-datar/lingkaran',lingkaran)
router.get('/bangun-ruang/kubus',kubus)
router.get('/bangun-ruang/balok',balok)
router.get('/bangun-ruang/tabung',tabung)

module.exports= router





