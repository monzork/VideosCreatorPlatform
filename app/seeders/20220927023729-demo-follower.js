module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('follow', [
      {
        fk_idFollower: 1,
        fk_idFollowed: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }
};
