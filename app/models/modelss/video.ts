import { Model, UUIDV4 } from 'sequelize';

export type VideoDTO = {
  id: string;
  url: string;
  title: string;
  published: boolean;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Video extends Model<VideoDTO> implements VideoDTO {
    id!: string;
    url!: string;
    title!: string;
    idFollower!: string;
    published: boolean = false;

    static associate(models: any) {
      Video.belongsToMany(models.User, {
        through: models.UserVideo
      });
    }
  }

  Video.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Video'
    }
  );
  return Video;
};
