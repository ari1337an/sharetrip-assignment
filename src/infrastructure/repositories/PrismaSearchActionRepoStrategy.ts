import SearchActionRepoStrategy from "@/infrastructure/repositories/interfaces/SearchActionRepoStrategy";
import SearchActionEntity from "@/infrastructure/entities/SearchActionEntity";
import { PrismaClient, SearchAction } from "@prisma/client";

export default class PrismaSearchActionRepoStrategy
  implements SearchActionRepoStrategy
{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async recordSearchAction(searchAction: SearchActionEntity): Promise<any> {
    // map to prisma schema for insertion
    const prismaSchemaMappedData = {
      userIP: searchAction.userIP,
      timestamp: searchAction.timestamp,
      searchResults: {
        createMany: {
          data: searchAction.searchresults.map((result) => ({
            userId: result.userId,
            postId: result.id,
            title: result.title,
            body: result.body,
          }))
        },
      },
    };

    // push the SearchActionEntity into database
    try {
      let output = await this.prisma.searchAction.create({
        data: prismaSchemaMappedData,
      });
      return output
    } catch (error) {
      console.error("Error inserting SearchActionEntity:", error);
      throw error;
    }
  }
}
