const express = require('express');
const router = express.Router();
const {createTask, getAllTaskForSingleUser, deleteSingleTask, markAsDone, updateSingleTask} = require('../controllers/task.controller.js')
const {isUserValid} = require('../middlewares/tokenInspection.js')

router.route('/task/create').post(isUserValid,createTask);

router.route('/task/:id').get(isUserValid,getAllTaskForSingleUser)
.delete(isUserValid,deleteSingleTask)
.put(isUserValid,markAsDone)


router.route('/task/update/:id').put(isUserValid,updateSingleTask);


module.exports = router;