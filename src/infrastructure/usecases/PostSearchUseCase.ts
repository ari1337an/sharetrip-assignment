import PostEntity from "@/infrastructure/entities/PostEntity";
import SearchActionRepoStrategy from "@/infrastructure/repositories/interfaces/SearchActionRepoStrategy";
import SearchActionEntity from "@/infrastructure/entities/SearchActionEntity";

/**
 * Use Case Class
 */
export default class PostSearchUseCase {
  /**
   * Fetches external posts from external post api and filters out posts based on keywords
   * based on title and body of post and stores search results into database
   *
   * @param keyword string
   * @param userIp string
   * @param externalAPIAddress string
   * @param repository SearchActionRepoStrategy
   * @returns Promise<PostEntity[]>
   */
  async execute(
    keyword: string,
    userIp: string,
    externalAPIAddress: string,
    repository: SearchActionRepoStrategy
  ): Promise<PostEntity[]> {
    try {
      // Fetch posts from an external source (replace with actual logic)
      const posts = await this.fetchPostsFromExternalAPI(externalAPIAddress);

      // Search and filter posts based on the single keyword
      const filteredPosts = this.filterPosts(posts, keyword);

      // Create SearchAction Object
      const searchActionData = {
        uid: "",
        timestamp: (new Date()).toISOString(),
        userIP: userIp,
        searchresults: filteredPosts,
      };
      const searchAction = new SearchActionEntity(searchActionData);
      
      // Add the search results to the database
      const output = await repository.recordSearchAction(searchAction);
      
      // Return the filtered posts
      return {...output, matchedResults: filteredPosts}
      
    } catch (error) {
      console.error("Error in PostSearchUseCase:", error);
      throw error;
    }
  }

  /**
   * Fetches the external Posts from the External API and parses it into PostEntity Array.
   *
   * @param externalAPIAddress string
   * @returns Promise<PostEntity[]>
   */
  private async fetchPostsFromExternalAPI(
    externalAPIAddress: string
  ): Promise<PostEntity[]> {
    try {
      // Fetch external posts from external api and handle errors
      const response = await fetch(externalAPIAddress);
      if (!response.ok) throw new Error(`Failed to fetch posts API data.`);

      // Json object
      const data = await response.json();

      // Create PostEntity out of the Posts
      const posts: PostEntity[] = data.map((post: any) => new PostEntity(post));

      return posts;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Searches the keyword in the title and body of the posts
   * and returns the matched posts. If the keyword resided in
   * either the title of body of the post then it will be included.
   * If keyword is undefined or null, return all posts without filtering
   *
   * Matching scheme: lowercase strings (title/body) with lowercase keyword
   *
   * @param posts PostEntity[]
   * @param keyword string
   * @returns PostEntity[]
   */
  private filterPosts(posts: PostEntity[], keyword: string): PostEntity[] {
    if (keyword === undefined || keyword === null) {
      return posts;
    }

    const lowercaseKeyword = keyword.toLowerCase();

    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      return (
        title.includes(lowercaseKeyword) || body.includes(lowercaseKeyword)
      );
    });
  }
}
