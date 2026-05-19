import { getProjectListViewModel } from "@/modules/work/presentation/viewModels/projectListViewModel";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  locale?: string;
}

export async function Projects({ range, exclude, locale = "es" }: ProjectsProps) {
  const displayedProjects = await getProjectListViewModel({
    locale,
    range,
    exclude,
  });

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/${locale}/work/${post.slug}`}
          images={post.images}
          title={post.title}
          description={post.summary}
          content={post.content}
          avatars={post.team.map((member) => ({ src: member.avatar }))}
          link={post.link || ""}
        />
      ))}
    </Column>
  );
}
