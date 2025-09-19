const db = require('../config/db');

const Volunteer = {
  getAll: (callback) => {
    db.query('SELECT * FROM volunteers', callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO volunteers SET ?', data, callback);
  }
};

module.exports = Volunteer;
