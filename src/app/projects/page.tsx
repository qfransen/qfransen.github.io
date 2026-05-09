import { Metadata } from "next";
import { JSX } from "react";
import Image from "next/image";
import "./projects.css";

const imageDir = "/images/projects/";

// Generate title for the projects page and other pages in projects
export function generateMetadata(): Metadata {
  return {
    title: "Quinn Fransen | Projects",
  };
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="mb-12">Projects</h1>

      <section className="mb-16">
        <h2 className="mb-8 border-b pb-2">Personal Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createProject(
            "Personal Website",
            undefined,
            "You're looking at it right now",
            ["next.js", "react", "typescript", "tailwindcss"],
          )}
          {createProject("Snell's Law", "snells.png", undefined, undefined)}
          {createProject("LeCalculator", undefined, undefined, undefined)}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 border-b pb-2">School Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createProject(
            "Car Image Classifier",
            "car-classifier.png",
            "A group project in CSE404 at MSU that used Machine Learning to predict the types of " +
              "vehicles show in images",
            ["Python", "ML"],
          )}
          {createProject(
            "NFL Game Outcome Predictor",
            "football-scores.png",
            undefined,
            undefined,
          )}
          {createProject(
            "Backend Web Microservices App",
            undefined,
            undefined,
            undefined,
          )}
          {createProject(
            "Autonomous Lane Keeping",
            "autonomous1.png",
            undefined,
            undefined,
          )}
          {createProject(
            "Animation Editor",
            "animation.png",
            undefined,
            undefined,
          )}
          {createProject("Logic Game", "logic-game.png", undefined, undefined)}
          {createProject("Popping Blimps", "blimps.png", undefined, undefined)}
        </div>
      </section>
    </div>
  );
}

function createProject(
  name: string,
  image?: string,
  description?: string,
  techStack?: string[],
): JSX.Element {
  const imgPath: string = imageDir + image;
  const alt_description: string = name + "-" + image;
  const sectionId = name.toLowerCase().replace(/\s+/g, "-"); // e.g., "Cool Project" -> "cool-project"

  const displayTags = techStack?.slice(0, 3) || [];
  const hiddenTags = techStack?.slice(3) || [];

  return (
    <div
      id={sectionId}
      className="project flex flex-col bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {image && (
        <div className="relative w-full h-48 bg-muted">
          <Image
            src={imgPath}
            alt={alt_description}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold tracking-tight mb-2 m-0 p-0">
          {name}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            {description}
          </p>
        )}
        {techStack && techStack.length > 0 && (
          <div className="mt-auto pt-4 group relative">
            <div className="flex flex-wrap gap-2 items-center">
              {displayTags.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
              {hiddenTags.length > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground cursor-help">
                  +{hiddenTags.length}
                </span>
              )}
            </div>
            {hiddenTags.length > 0 && (
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 w-full">
                <div className="bg-popover text-popover-foreground border shadow-md rounded-md p-2 flex flex-wrap gap-2">
                  {hiddenTags.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
