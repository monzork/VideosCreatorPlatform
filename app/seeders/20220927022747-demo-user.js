module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        name: 'John Doe',
        email: 'jhondoe@example.com',
        password:
          '$2y$10$iEwVTU2A0ujY/zkuqTqmje0izH9fiFSOX.8VB0srIC9LpR5Jki0UG',
        type: 'student',
        photo:
          'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/2x/external-cdn-web-development-flaticons-lineal-color-flat-icons.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Doe John ',
        email: 'doejhon@example.com',
        password:
          '$2y$10$iEwVTU2A0ujY/zkuqTqmje0izH9fiFSOX.8VB0srIC9LpR5Jki0UG',
        type: 'teacher',
        photo:
          'https://img.icons8.com/external-others-bomsymbols-/344/external-cdn-big-data-bluetone-others-bomsymbols--4.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }
};
