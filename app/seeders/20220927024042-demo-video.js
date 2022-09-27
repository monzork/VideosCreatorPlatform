module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('video', [
      {
        url: 'https://www.youtube.com/watch?v=xcJtL7QggTI',
        title: 'Demo Video',
        userId: 2,
        published: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    await queryInterface.bulkInsert('uservideo', [
      {
        like: true,
        view: 1,
        videoId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }
};
