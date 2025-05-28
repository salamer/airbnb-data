import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DataSource,
  DataSourceOptions,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import config from "./config";

export const schema = "airbnb";

@Entity({ schema, name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: "password_hash" })
  passwordHash: string;

  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Column({ name: "avatar_url", type: "text", nullable: true })
  avatarUrl: string | null;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}

@Entity({ schema, name: "houses" })
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "image_url", type: "text" })
  imageUrl: string;

  @Column({ type: "text", nullable: true })
  caption: string | null;

  @Column({ type: "decimal", nullable: true, default: 0 })
  price: number;

  @Column({ type: "text", nullable: true, default: "" })
  address: string;

  @Column({ type: "text", nullable: true, default: "" })
  state: string;

  @Column({ type: "text", nullable: true, default: "" })
  city: string;

  @Column({ type: "text", nullable: true, default: "" })
  zipCode: string;

  @Column({ type: "text", nullable: true, default: "" })
  size: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: number;
}

@Entity({ schema, name: "orders" })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "house_id" })
  houseId: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "start_date", type: "date" })
  startDate: Date;

  @Column({ name: "end_date", type: "date" })
  endDate: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    name: "total_price",
    type: "decimal",
    nullable: true,
    default: 0,
  })
  totalPrice: number;

  @ManyToOne(() => House)
  @JoinColumn({ name: "house_id" })
  house: House;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}

@Entity({ schema, name: "likes" })
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => House)
  @JoinColumn({ name: "house_id" })
  house: House;

  @Column({ name: "house_id" })
  houseId: number;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [User, House, Order, Like],

  subscribers: [],
  migrations: [],
});
