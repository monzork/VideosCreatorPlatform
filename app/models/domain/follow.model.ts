import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  PrimaryKey
} from 'sequelize-typescript';

@Table({ tableName: 'follow' })
export default class Follow extends Model {
  @Column
  public idFollowed: string;

  @Column
  public idFollower: number;
}
