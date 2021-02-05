module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'todo-list',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
