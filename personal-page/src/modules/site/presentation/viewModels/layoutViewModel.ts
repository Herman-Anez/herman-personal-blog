import { getDictionary } from "@/shared/i18n/dictionaries";
import { Person, Social } from "@/types";

export interface LayoutViewState {
  person: Person;
  social: Social;
  navigation: {
    about: { label: string; path: string };
    work: { label: string; path: string };
    blog: { label: string; path: string };
    gallery: { label: string; path: string };
  };
  scheduleCallText: string;
}

export const getLayoutViewModel = async (locale: string): Promise<LayoutViewState> => {
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

  return {
    person,
    social,
    navigation: {
      about: { label: dict.about.label, path: `/${locale}/about` },
      work: { label: dict.work.label, path: `/${locale}/work` },
      blog: { label: dict.blog.label, path: `/${locale}/blog` },
      gallery: { label: dict.gallery.label, path: `/${locale}/gallery` },
    },
    scheduleCallText: dict.ui.scheduleCall || "Schedule a call",
  };
};
