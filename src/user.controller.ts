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
import { In } from "typeorm";
import { getCurrentUser } from "./auth.middleware";

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

  // @Security("jwt", ["optional"])
  @Get("{userId}/orders")
  public async getUserOrders(
    @Path() userId: number,
    @Request() req: Express.Request,
  ): Promise<UserOrdersResponse[]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return [];
    }

    const orders = await AppDataSource.getRepository(Order).find({
      where: { userId },
      relations: ["house", "user"],
    });

    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();
    const likes =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Like).find({
            where: [
              {
                userId: currentUser.userId,
                houseId: In(orders.map((o) => o.houseId)),
              },
            ],
          })
        : [];
    const has_orders =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Order).find({
            where: {
              userId: currentUser.userId,
              houseId: In(orders.map((o) => o.houseId)),
            },
          })
        : [];

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
        hasLiked: likes.some((like) => like.houseId === order.houseId),
        hasOrdered: has_orders.some((order) => order.houseId === order.houseId),
      }));
  }

  // @Security("jwt", ["optional"])
  @Get("{userId}/likes")
  public async getUserLikes(
    @Request() req: Express.Request,
    @Path() userId: number,
  ): Promise<HouseResponse[]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) {
      return [];
    }

    const posts = await AppDataSource.getRepository(Like).find({
      where: { userId },
      relations: ["user", "house"],
      order: { createdAt: "DESC" },
    });

    // const currentUser = req.user as JwtPayload;
    const currentUser = getCurrentUser();
    const likes =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Like).find({
            where: [
              {
                userId: currentUser.userId,
                houseId: In(posts.map((o) => o.houseId)),
              },
            ],
          })
        : [];
    const has_orders =
      currentUser && currentUser.userId
        ? await AppDataSource.getRepository(Order).find({
            where: {
              userId: currentUser.userId,
              houseId: In(posts.map((o) => o.houseId)),
            },
          })
        : [];

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
      hasLiked: likes.some((like) => like.houseId === post.houseId),
      hasOrdered: has_orders.some((order) => order.houseId === post.houseId),
    }));
  }
}
