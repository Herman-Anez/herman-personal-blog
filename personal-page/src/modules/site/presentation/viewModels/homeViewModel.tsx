import React from "react";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { RenderHTML } from "@/components/RenderHTML";
import { Line, Row, Text } from "@once-ui-system/core";
import { Home, Person, About } from "@/types";

export interface HomeViewState {
  home: Home;
  person: Person;
  about: About;
  latestFromBlogText: string;
}

export const getHomeViewModel = async (locale: string): Promise<HomeViewState> => {
  const dict = getDictionary(locale);

  const person: Person = {
    firstName: dict.person.firstName,
    lastName: dict.person.lastName,
    name: dict.person.name,
    role: dict.person.role,
    avatar: "/images/avatar.jpg",
    email: dict.person.email,
    location: dict.person.location as any,
  };

  const home: Home = {
    path: `/${locale}`,
    image: "/images/og/home.jpg",
    label: dict.home.label,
    title: dict.home.title,
    description: dict.home.description,
    headline: <RenderHTML html={dict.home.headline} />,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Featured Work</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            {dict.ui.featuredWork}
          </Text>
        </Row>
      ),
      href: `/${locale}/work/automate-design-handovers-with-a-figma-to-code-pipeline`,
    },
    subline: <RenderHTML html={dict.home.subline} />,
  };

  const about: About = {
    path: `/${locale}/about`,
    label: dict.about.label,
    title: dict.about.title,
    description: dict.about.description,
    tableOfContent: { display: true, subItems: false },
    avatar: { display: true },
    calendar: { display: false, link: "https://cal.com" },
    intro: {
      display: true,
      title: dict.about.introTitle,
      description: "",
    },
    work: { display: true, title: dict.about.workTitle, experiences: [] },
    studies: { display: true, title: dict.about.studiesTitle, institutions: [] },
    technical: { display: true, title: dict.about.technicalTitle, skills: [] },
  };

  return {
    home,
    person,
    about,
    latestFromBlogText: dict.ui.latestFromBlog,
  };
};
