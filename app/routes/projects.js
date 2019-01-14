const express        = require('express');
const router         = express.Router();
const projectController = require('../controllers/project.controller');
const fileController = require('../controllers/file.controller');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getSingleProject);
router.post('/add', fileController.any(), projectController.AddProject );
router.post('/update/:id', fileController.any(), projectController.UpdateProject);
router.post('/delete/:id', projectController.DeleteProject)

module.exports = router;