import { Request, Response } from "express";
import helper from "@/utils/helper";
import config from "@/utils/config";
import PostSearchUseCase from "@/infrastructure/usecases/PostSearchUseCase";

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

    // Send data to UseCases which will generate response
    const filteredPosts = await new PostSearchUseCase().execute(
      keyword,
      config.EXTERNAL_API
    );

    // Return response
    return response
      .status(200)
      .send(helper.requestSuccessOutputWrapper(filteredPosts));
  } catch (error) {
    return response.status(500).send(helper.requestFailedOutputWrapper(error));
  }
}
