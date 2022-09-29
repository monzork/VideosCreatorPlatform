module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('video', [
      {
        url: 'https://img.icons8.com/external-others-bomsymbols-/344/external-cdn-big-data-bluetone-others-bomsymbols--4.png',
        title: 'Demo Video',
        createdBy: 2,
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
