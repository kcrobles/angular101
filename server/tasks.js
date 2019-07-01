const express = require('express');
const router = express.Router();
const taskService = require('./service');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res, next) {
  const data = taskService.getTasks();
  console.log('Getting all tasks');
  if (data) {
    res.json({
      "status": "OK",
      "data": data
    });
  } else {
    res.json({
      "status": "ERROR",
      "message": "Could not fetch the tasks"
    })
  }
});

router.get('/:id', function(req, res, next) {
  const { id = '' } = req.params;
  console.log('Retrieving task: ' + id);
  const task = taskService.fetchTask(id);
  if (task) {
    res.json({
      "status": "OK",
      "data": task
    });
  } else {
    res.status(404);
    res.json({
      "status": "ERROR",
      "message": "Task not found"
    });
  }
});

router.post('/', function(req, res, next) {
  const { task } = req.body;
  const before = taskService.getTasks().tasks.length;
  taskService.addTask(task);
  const after = taskService.getTasks();
  if (after.tasks.length > before) {
    res.json({
      "status": "OK",
      "data": after
    });
  } else {
    res.status(403);
    res.json({
      "status": "ERROR",
      "message": "Could not save the task"
    });
  }
});

router.put('/:id', function(req, res, next) {
  const { id = '' } = req.params;
  console.log('Updating tasks: ' + id);
  const { task } = req.body;
  const updated = taskService.updateTask(id, task);
  if (updated) {
    const data = taskService.getTasks();
    res.json({
      "status": "OK",
      "data": data
    });
  } else {
    res.status(403);
    res.json({
      "status": "ERROR",
      "message": "Could not update the task"
    });
  }
});

router.delete('/:id', function(req, res, next) {
  const { id = '' } = req.params;
  console.log('Deleting tasks: ' + id);
  const deleted = taskService.deleteTask(id);
  if (deleted) {
    const data = taskService.getTasks();
    res.json({
      "status": "OK",
      "data": data
    });
  } else {
    res.status(403);
    res.json({
      "status": "ERROR",
      "message": "Could not delete the task"
    });
  }
});

module.exports = router;
