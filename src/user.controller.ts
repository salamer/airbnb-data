import {
  Post,
  Delete,
  Route,
  Tags,
  Security,
  Request,
  Path,
  Controller,
  Res,
  TsoaResponse,
  Get,
  SuccessResponse,
} from "tsoa";
import { AppDataSource, User, Order, House, Like } from "./models";
import type { JwtPayload } from "./utils";
import { HouseResponse } from "./house.controller";

interface UserProfileResponse {
  id: number;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

interface UserOrdersResponse extends HouseResponse {
  userId: number;
  startDate?: Date;
  endDate?: Date;
  totalPrice?: number;
}

@Route("users")
@Tags("Users & Orders")
export class UserController extends Controller {
  @Get("{userId}/profile")
  public async getUserProfile(
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>
  ): Promise<UserProfileResponse> {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      return notFound(404, { message: "User not found" });
    }

    return {
      id: user.id,
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }

  @Get("{userId}/orders")
  public async getUserOrders(
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>
  ): Promise<UserOrdersResponse[]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return notFound(404, { message: "User not found" });
    }

    const orders = await AppDataSource.getRepository(Order).find({
      where: { userId },
      relations: ["house", "user"],
    });

    if (orders.length === 0) {
      return notFound(404, { message: "No orders found for this user." });
    }

    return orders
      .filter((order) => order.house !== null)
      .map((order) => ({
        id: order.id,
        price: order.house.price,
        userId: order.userId,
        houseId: order.houseId,
        username: order.user?.username || "unknown",
        avatarUrl: order.user?.avatarUrl || null,
        createdAt: order.createdAt,
        imageUrl: order.house.imageUrl,
        address: order.house.address,
        city: order.house.city,
        state: order.house.state,
        zipCode: order.house.zipCode,
        caption: order.house.caption,
        size: order.house.size,
        startDate: order.startDate,
        endDate: order.endDate,
        totalPrice: order.totalPrice,
      }));
  }

  @Get("{userId}/likes")
  public async getUserLikes(
    @Path() userId: number,
    @Res() notFound: TsoaResponse<404, { message: string }>
  ): Promise<HouseResponse[]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return notFound(404, { message: "User not found" });
    }

    const posts = await AppDataSource.getRepository(Like).find({
      where: { userId },
      relations: ["user"],
    });

    if (posts.length === 0) {
      return notFound(404, { message: "No liked posts found for this user." });
    }

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.house.imageUrl,
      caption: post.house.caption,
      price: post.house.price,
      address: post.house.address,
      state: post.house.state,
      city: post.house.city,
      zipCode: post.house.zipCode,
      size: post.house.size,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || "unknown",
      avatarUrl: post.user?.avatarUrl || null,
    }));
  }
}
