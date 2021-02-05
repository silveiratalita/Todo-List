'use strict';
import Task from '../../models/task';

class TaskController {
  store = async (req, res) => {
    try {
      const taskSaved = await Task.createTask(req.body);

      return res.status(201).send(taskSaved);
    } catch (err) {
      console.error(err);
      return res.send(err.message);
    }
  };

  updateTask = async (req, res) => {
    const { description, name, isConcluded, email, password } = req.body;
    const { id } = req.params;
    const task = {
      id,
      description,
      name,
      isConcluded,
      email,
      password,
    };
    try {
      await Task.updateTask(task);
      return res.status(200).send();
    } catch (err) {
      console.error(err);
      //Usando 500 para generalizar, o correto seria identificar cada statuscode HTTP.
      return res.status(500).send({ error: err.message });
    }
  };
  getTasks = async (req, res) => {
    try {
      const tasks = await Task.getTasks();
      return res.status(200).send(tasks);
    } catch (err) {
      console.error(err);
      //Usando 404 para generalizar, o correto seria identificar cada statuscode HTTP.
      return res.status(404).send({ error: err.message });
    }
  };

  async createRandonTasks(req, res) {
    const task = { name: 'eu', email: 'eu@me.com' };
    try {
      const tasksCreated = await Task.createRandonTasks(task);
      return res.send(tasksCreated);
    } catch (err) {
      return res.send(err);
    }
  }
}
export default new TaskController();
