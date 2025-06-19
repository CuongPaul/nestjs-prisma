export class CreatePostDto {
  title: string;
  authorId: number;
  content?: string;
  published?: boolean;
}
