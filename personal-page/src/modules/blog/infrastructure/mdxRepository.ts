import { getPosts } from "@/utils/utils";
import { BlogPost } from "../domain/Post";

export class MdxBlogRepository {
  /**
   * Obtiene la colección completa de posts del blog desde la infraestructura física de MDX.
   */
  public getAllPosts(): BlogPost[] {
    const rawPosts = getPosts(["src", "app", "[locale]", "blog", "posts"]);
    return rawPosts as BlogPost[];
  }

  /**
   * Obtiene un post específico por su slug.
   */
  public getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  }
}

export const mdxBlogRepository = new MdxBlogRepository();
