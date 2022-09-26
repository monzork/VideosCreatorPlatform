import { Model, UUIDV4 } from 'sequelize';

export type UserVideoDTO = {
  id: string;
  like: boolean;
  view: number;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class UserVideo extends Model<UserVideoDTO> implements UserVideoDTO {
    id!: string;
    like!: boolean;
    view: number = 0;
  }

  UserVideo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      view: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'UserVideo'
    }
  );
  return UserVideo;
};
