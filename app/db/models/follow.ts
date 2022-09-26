import { Model, UUIDV4 } from 'sequelize';

export type FollowDTO = {
  id: string;
  idFollowed: string;
  idFollower: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Follow extends Model<FollowDTO> implements FollowDTO {
    id!: string;
    idFollowed!: string;
    idFollower!: string;
  }

  Follow.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      idFollower: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idFollowed: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Follow'
    }
  );
  return Follow;
};
