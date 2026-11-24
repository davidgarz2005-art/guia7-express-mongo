
const express = require('express');
const router = express.Router();

const ReportesController = require('../controllers/ReportesController');

// 10. Obtener estadísticas
router.get('/estadisticas', ReportesController.obtenerEstadisticas);

module.exports = router;
