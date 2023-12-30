import { z, ZodError } from "zod";

export default class PostEntity {
  userId: number;
  id: number;
  title: string;
  body: string;

  constructor(data: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }) {
    try {
      // Validate entity using zod
      const validatedData = PostEntity.schema().parse(data);

      // Set the field values
      this.userId = validatedData.userId;
      this.id = validatedData.id;
      this.title = validatedData.title;
      this.body = validatedData.body;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("PostEntity Validation error:", error.errors);
      } else {
        console.error("Unexpected error during PostEntity validation:", error);
      }
      throw error;
    }
  }

  static schema() {
    return z.object({
      userId: z.number().min(0, { message: "Post's User ID is invalid!" }),
      id: z.number().min(0, { message: "Post ID is invalid!" }),
      title: z.string().min(1, { message: "Post title cannot be empty!" }),
      body: z.string().min(1, { message: "Post body cannot be empty!" }),
    });
  }
}
