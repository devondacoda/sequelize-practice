const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
  first: {
    type: Sequelize.STRING
  },
  last: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 23
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  bio: {
    type: Sequelize.TEXT
  }
}, {
  hooks: {
    validationFailed: (user, options, err) => {
      if (err) {
        if (err.errors[0].path === 'email') {
          throw new Error('email cannot be null');
        }
      }
    }
  },
  getterMethods: {
    fullName () {
      return this.first + ' ' + this.last;
    }
  }
});

module.exports = User;
