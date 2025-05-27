import {
  Body,
  Get,
  Post as HttpPost,
  Route,
  Tags,
  Security,
  Request,
  Path,
  Query,
  Controller,
  Res,
  TsoaResponse,
  SuccessResponse,
} from "tsoa";
import { AppDataSource } from "./models";
import { House, User } from "./models";
import { uploadBase64ToObjectStorage } from "./objectstorage.service";
import type { JwtPayload } from "./utils";

export interface CreateHouseBase64Input {
  imageBase64: string;
  imageFileType: string;
  caption?: string;
  price: number;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  size: string;
}

export interface HouseResponse {
  id: number;
  imageUrl: string;
  caption: string | null;
  price: number;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  size: string;
  createdAt: Date;
  userId: number;
  username: string;
  avatarUrl: string | null;
}

@Route("houses")
@Tags("Houses")
export class HouseController extends Controller {
  @Security("jwt")
  @HttpPost("")
  @SuccessResponse(200, "Post Created")
  public async createHouse(
    @Request() req: Express.Request,
    @Body() body: CreateHouseBase64Input,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() serverErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<HouseResponse> {
    const currentUser = req.user as JwtPayload;

    if (!body.imageBase64 || !body.imageFileType.startsWith("image/")) {
      return badRequestResponse(400, {
        message: "imageBase64 and a valid imageFileType are required.",
      });
    }

    let base64Data = body.imageBase64;
    const prefixMatch = body.imageBase64.match(/^data:(image\/\w+);base64,/);
    if (prefixMatch) {
      base64Data = body.imageBase64.substring(prefixMatch[0].length);
    }

    try {
      const uploadResult = await uploadBase64ToObjectStorage(
        base64Data,
        body.imageFileType
      );

      const postRepo = AppDataSource.getRepository(House);
      const newPost = postRepo.create({
        userId: currentUser.userId,
        imageUrl: uploadResult.objectUrl,
        caption: body.caption || null,
        price: body.price,
        address: body.address,
        state: body.state,
        city: body.city,
        zipCode: body.zipCode,
        size: body.size,
      });
      const savedPost = await postRepo.save(newPost);

      const user = await AppDataSource.getRepository(User).findOneBy({
        id: currentUser.userId,
      });

      this.setStatus(200);
      return {
        id: savedPost.id,
        imageUrl: savedPost.imageUrl,
        caption: savedPost.caption,
        price: savedPost.price,
        address: savedPost.address,
        state: savedPost.state,
        city: savedPost.city,
        zipCode: savedPost.zipCode,
        size: savedPost.size,
        createdAt: savedPost.createdAt,
        userId: savedPost.userId,
        username: user?.username || "unknown",
        avatarUrl: user?.avatarUrl || null,
      };
    } catch (error: any) {
      console.error("Post creation failed:", error);
      return serverErrorResponse(500, {
        message: error.message || "Failed to create post.",
      });
    }
  }

  @Get("")
  public async getFeedHouses(
    @Query() limit: number = 10,
    @Query() offset: number = 0
  ): Promise<HouseResponse[]> {
    const houses = await AppDataSource.getRepository(House).find({
      relations: ["user"],
      order: { createdAt: "DESC" },
      take: limit,
      skip: offset,
    });

    return houses.map((house) => ({
      id: house.id,
      imageUrl: house.imageUrl,
      caption: house.caption,
      price: house.price,
      address: house.address,
      state: house.state,
      city: house.city,
      zipCode: house.zipCode,
      size: house.size,
      createdAt: house.createdAt,
      userId: house.userId,
      username: house.user?.username || "unknown",
      avatarUrl: house.user?.avatarUrl || null,
    }));
  }

  @Get("search")
  public async searchHouses(
    @Query() query: string,
    @Query() limit: number = 10,
    @Query() offset: number = 0,
    @Query() state: string | undefined = undefined,
    @Query() city: string | undefined = undefined,
    @Query() zipCode: string | undefined = undefined,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>
  ): Promise<HouseResponse[]> {
    if (!query.trim()) {
      return badRequestResponse(400, {
        message: "Search query cannot be empty",
      });
    }
    const searchTerm = query.trim().split(/\s+/).join(" & ");

    let searchHandle = AppDataSource.getRepository(House)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("to_tsvector(post.caption) @@ plainto_tsquery(:query)", {
        query: searchTerm,
      });

    if (state) {
      searchHandle = searchHandle.andWhere("post.state = :state", { state });
    }
    if (city) {
      searchHandle = searchHandle.andWhere("post.city = :city", { city });
    }
    if (zipCode) {
      searchHandle = searchHandle.andWhere("post.zipCode = :zipCode", {
        zipCode,
      });
    }

    const posts = await searchHandle
      .orderBy("post.createdAt", "DESC")
      .take(limit)
      .skip(offset)
      .getMany();

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      price: post.price,
      address: post.address,
      state: post.state,
      city: post.city,
      zipCode: post.zipCode,
      size: post.size,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || "unknown",
      avatarUrl: post.user?.avatarUrl || null,
    }));
  }

  @Get("{houseId}")
  public async getHouseById(
    @Path() houseId: number,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>
  ): Promise<HouseResponse> {
    const post = await AppDataSource.getRepository(House).findOne({
      where: { id: houseId },
      relations: ["user"],
    });

    if (!post) {
      return notFoundResponse(404, { message: "Post not found" });
    }

    return {
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      price: post.price,
      address: post.address,
      state: post.state,
      city: post.city,
      zipCode: post.zipCode,
      size: post.size,
      createdAt: post.createdAt,
      userId: post.userId,
      username: post.user?.username || "unknown",
      avatarUrl: post.user?.avatarUrl || null,
    };
  }
}
