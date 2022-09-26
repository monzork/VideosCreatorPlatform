'use strict';

import { Model, UUIDV4 } from 'sequelize';

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: string;
  photo: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserDTO> implements UserDTO {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    type!: string;
    photo!: string;

    static associate(models: any) {
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: 'Parents',
        foreignKey: 'idFollowed'
      });
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: 'Siblings',
        foreignKey: 'idFollower'
      });
      User.belongsToMany(models.Video, {
        through: models.UserVideo
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
