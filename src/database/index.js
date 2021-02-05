import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Task from '../app/models/task';

const models = [Task];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    return models.map(model => model.init(this.connection));
  }
}

export default new Database();
