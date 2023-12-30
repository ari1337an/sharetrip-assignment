import { Request, Response } from "express";
import helper from "@/utils/helper";
import config from "@/utils/config";
import PostSearchUseCase from "@/infrastructure/usecases/PostSearchUseCase";
import PrismaSearchActionRepoStrategy from "@/infrastructure/repositories/PrismaSearchActionRepoStrategy";

/**
 * ExpressJS Request handler function that fetches keyword key
 * from "?keyword='item'" request and executes PostSearchUseCase usecase
 * and outputs the response as ExpressJS Response
 *
 * @param request
 * @param response
 * @returns
 */
export default async function searchController(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    // Retrieve keyword from Request
    const keyword = request.query?.keyword as string;

    // Retrieve user IP address
    const userIp = request?.ip as string

    // Repository (For Dependency injection)
    const repository = new PrismaSearchActionRepoStrategy()

    // Send data to UseCases which will generate response
    const filteredPosts = await new PostSearchUseCase().execute(
      keyword,
      userIp,
      config.EXTERNAL_API,
      repository
    );

    // Return response
    return response
      .status(200)
      .send(helper.requestSuccessOutputWrapper(filteredPosts));
  } catch (error) {
    return response.status(500).send(helper.requestFailedOutputWrapper(error));
  }
}
