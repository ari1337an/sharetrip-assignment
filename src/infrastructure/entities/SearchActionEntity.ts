import { z, ZodError, ZodDate } from "zod";
import PostEntity from "@/infrastructure/entities/PostEntity";

export default class SearchActionEntity {
  uid: string;
  timestamp: string; 
  userIP: string;
  searchresults: PostEntity[];

  constructor(data: {
    uid: string;
    timestamp: string;
    userIP: string;
    searchresults: PostEntity[];
  }) {

    try {
      // Validate entity using Zod
      const validatedData = (SearchActionEntity.schema()).parse(data);

      // Set the field values
      this.uid = validatedData.uid as string;
      this.timestamp = validatedData.timestamp as string;
      this.userIP = validatedData.userIP as string;
      this.searchresults = validatedData.searchresults as PostEntity[];
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("SearchActionEntity Validation error:", error.errors);
      } else {
        console.error("Unexpected error during SearchActionEntity validation:", error);
      }
      throw error;
    }
  }

  static schema() {
    return z.object({
      uid: z.string().min(0),
      timestamp: z.string(),
      userIP: z.string().ip(),
      searchresults: z.array(z.instanceof(PostEntity)),
    });
  }
}
