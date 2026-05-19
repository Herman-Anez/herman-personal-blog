import { getPosts } from "@/utils/utils";
import { Project } from "../domain/Project";

export class ProjectRepository {
  /**
   * Obtiene todos los proyectos del portafolio.
   */
  public getAllProjects(): Project[] {
    const rawProjects = getPosts(["src", "app", "[locale]", "work", "projects"]);
    return rawProjects as Project[];
  }

  /**
   * Obtiene un proyecto específico por su slug.
   */
  public getProjectBySlug(slug: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find((project) => project.slug === slug) ?? null;
  }
}

export const projectRepository = new ProjectRepository();
