const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');

// middleware that is specific to this router

//router.get('/', themeController.getThemes);
router.get('/', themeController.sortbyDate );
//router.get('/:username', themeController.getMyThemes );
router.delete('/:themeId', auth(), themeController.deleteTheme);


router.post('/',auth(), themeController.createTheme);

router.get('/:themeId', themeController.getTheme);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router