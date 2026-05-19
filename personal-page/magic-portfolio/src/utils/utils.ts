import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function scanMDX(dir: string, baseDir: string): any[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results: any[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(scanMDX(fullPath, baseDir));
    } else if (entry.isFile() && path.extname(entry.name) === ".mdx") {
      const relativePath = path.relative(baseDir, fullPath);
      // Remove the .mdx extension
      const relativeSlug = relativePath.slice(0, -4);
      // Normalize path separators to forward slash for URL/slug consistency
      const normalizedSlug = relativeSlug.replace(/\\/g, "/");
      const parts = normalizedSlug.split("/");

      let slug = normalizedSlug;
      let family: string | undefined = undefined;
      let isIndex = false;

      if (parts.length > 1) {
        // It resides inside a subfolder family
        const parentFolder = parts[0];
        const lastPart = parts[parts.length - 1];

        if (lastPart === "index") {
          isIndex = true;
          // Slug is the path without the index suffix (e.g. "ddd-guide")
          slug = parts.slice(0, -1).join("/");
          family = undefined; // Index is the root, so it doesn't have a parent family link
        } else {
          isIndex = false;
          slug = normalizedSlug;
          family = parentFolder;
        }
      } else {
        // Flat file in root directory
        isIndex = false;
        family = undefined;
      }

      const { metadata, content } = readMDXFile(fullPath);

      results.push({
        slug,
        family,
        isIndex,
        metadata,
        content,
      });
    }
  }

  return results;
}

export function getPosts(customPath = ["src", "app", "[locale]", "blog", "posts"]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  if (!fs.existsSync(postsDir)) {
    notFound();
  }
  return scanMDX(postsDir, postsDir);
}
