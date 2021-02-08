import Sequelize, { Model } from 'sequelize';
import validEmail from '../../service/validateEmail';
import getCatFacts from '../../service/getCatFacts';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        description: Sequelize.STRING,
        concludingToPending: Sequelize.INTEGER,
        isConcluded: { type: Sequelize.BOOLEAN, defaultValue: false },
      },
      {
        sequelize,
      }
    );
  }

  static async getTasks() {
    const allTasks = await Task.findAll();
    return allTasks;
  }

  static async createRandonTasks(task) {
    const facts = await getCatFacts();
    const tasks = facts.map(e => ({
      description: e,
      name: task.name,
      email: task.email,
    }));
    const taskCreated = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tasks.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const saved = await this.createTask(tasks[i]);
      taskCreated.push(saved);
    }
    return taskCreated;
  }

  static async createTask(task) {
    // eslint-disable-next-line no-param-reassign
    task.isConcluded = false;
    this.validateRequired(task);
    const newTask = new Task(task);
    await newTask.setTask(task);
    const taskSaved = await newTask.save();
    return taskSaved;
  }

  static async updateTask(task) {
    this.validateRequired(task);
    const taskFound = await Task.findOne({ where: { id: task.id } });
    await taskFound.setTask(task);
    taskFound.save();
    return taskFound.dataValues;
  }

  async setTask(task) {
    this.setDescription(task.description);
    await this.setEmail(task.email);
    this.setName(task.name);
    this.setIsConcluded(task.isConcluded, task.password);
  }

  static validateRequired(task) {
    if (
      !task.description ||
      !task.name ||
      !task.email ||
      typeof task.isConcluded !== 'boolean'
    ) {
      throw new Error(`Invalid body Args - body: ${JSON.stringify(task)}`);
    }
  }

  setDescription(description) {
    this.description = description;
  }

  setIsConcluded(isConcluded, password) {
    if (this.isConcluded === true && isConcluded === false) {
      if (password !== 'TrabalheNaSaipos') {
        throw new Error('A senha informada não confere! Tente novamente!');
      }
      if (this.concludingToPending > 1) {
        throw new Error(
          'Você não pode mais mover essa task para ' +
            'pendente, pois já foi concluida por duas vezes'
        );
      }
      this.concludingToPending += 1;
    }
    this.isConcluded = isConcluded;
  }

  async setEmail(email) {
    const isValid = await validEmail(email);
    if (!isValid.valid) {
      throw new Error(
        `Esse email não é válido. ${
          isValid.did_you_mean !== ''
            ? `Você quis dizer ${JSON.stringify(isValid.did_you_mean)}?`
            : 'Tente outro e-mail.'
        }`
      );
    }
    this.email = email;
  }

  setName(name) {
    this.name = name;
  }
}

export default Task;
