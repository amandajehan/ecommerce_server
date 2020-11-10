'use strict';
'use strict';
const bcrypt = require('bcryptjs')
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync('./admin.json'))

    data.map(el => {
      el.password = bcrypt.hashSync(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
