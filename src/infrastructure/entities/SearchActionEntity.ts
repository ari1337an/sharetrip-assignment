import { z, ZodError } from "zod";
import PostEntity from "@/infrastructure/entities/PostEntity";

export default class SearchActionEntity {
  uid: string | null;
  matches: PostEntity[];

  constructor(data: {
    uid: number;
    matches: PostEntity[];
  }) {

    try {
      // Validate entity using zod 
      const validatedData = SearchActionEntity.schema().parse(data);

      // Set the field values
      this.uid = validatedData.uid;
      this.matches = validatedData.matches;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("SearchActionEntity Validation error:", error.errors);
      } else {
        console.error("Unexpected error during SearchActionEntity validation:", error);
      }
      throw error;
    }
  }

  static schema () {
    return z.object({
      uid: z.string().nullable(),
      matches: z.array(z.instanceof(PostEntity))
    });
  }
}
