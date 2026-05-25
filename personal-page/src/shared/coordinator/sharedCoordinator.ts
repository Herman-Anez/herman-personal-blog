import { getDictionary, Dictionary } from "@/shared/i18n/dictionaries";
import { Person, Social } from "@/types";

export interface SharedContext {
  locale: string;
  dict: Dictionary;
  person: Person;
  social: Social;
}

const AVATAR_PATH = "/images/avatar.jpg" as const;

export function buildPerson(dict: Dictionary): Person {
  return {
    firstName: dict.person.firstName,
    lastName: dict.person.lastName,
    name: dict.person.name,
    role: dict.person.role,
    avatar: AVATAR_PATH,
    email: dict.person.email,
    location: dict.person.location as any,
    languages: dict.person.languages as string[] | undefined,
  };
}

export function buildSocial(person: Person): Social {
  return [
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/Herman-Anez",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/herman-anez/",
      essential: true,
    },
    {
      name: "Email",
      icon: "email",
      link: `mailto:${person.email}`,
      essential: true,
    },
  ];
}

export function getSharedContext(locale: string): SharedContext {
  const dict = getDictionary(locale);
  const person = buildPerson(dict);
  const social = buildSocial(person);
  return { locale, dict, person, social };
}
