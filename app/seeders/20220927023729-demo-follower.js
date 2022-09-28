module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('follow', [
      {
        followerId: 1,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }
};
