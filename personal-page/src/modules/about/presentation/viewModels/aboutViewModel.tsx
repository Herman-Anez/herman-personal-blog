import React from "react";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { RenderHTML } from "@/components/RenderHTML";
import { About, Person, Social } from "@/types";

export interface AboutViewState {
  about: About;
  person: Person;
  social: Social;
}

export const getAboutViewModel = async (locale: string): Promise<AboutViewState> => {
  const dict = getDictionary(locale);

  const person: Person = {
    firstName: dict.person.firstName,
    lastName: dict.person.lastName,
    name: dict.person.name,
    role: dict.person.role,
    avatar: "/images/avatar.jpg",
    email: dict.person.email,
    location: dict.person.location as any,
    languages: dict.person.languages,
  };

  const social: Social = [
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/placeholder",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/placeholder/",
      essential: true,
    },
    {
      name: "Email",
      icon: "email",
      link: `mailto:${person.email}`,
      essential: true,
    },
  ];

  const about: About = {
    path: `/${locale}/about`,
    label: dict.about.label,
    title: dict.about.title,
    description: dict.about.description,
    tableOfContent: {
      display: true,
      subItems: false,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: false,
      link: "https://cal.com",
    },
    intro: {
      display: true,
      title: dict.about.introTitle,
      description: <RenderHTML html={dict.about.introDescription} />,
    },
    work: {
      display: true,
      title: dict.about.workTitle,
      experiences: dict.about.workExperiences.map((exp: any) => ({
        company: exp.company,
        timeframe: exp.timeframe,
        role: exp.role,
        achievements: exp.achievements.map((ach: any) => (
          <RenderHTML key={ach} html={ach} />
        )),
        images: [],
      })),
    },
    studies: {
      display: true,
      title: dict.about.studiesTitle,
      institutions: dict.about.studiesInstitutions.map((inst: any) => ({
        name: inst.name,
        description: <RenderHTML html={inst.description} />,
      })),
    },
    technical: {
      display: true,
      title: dict.about.technicalTitle,
      skills: dict.about.technicalSkills.map((skill: any) => ({
        title: skill.title,
        description: <RenderHTML html={skill.description} />,
        tags: [],
        images: [],
      })),
    },
  };

  return { about, person, social };
};
