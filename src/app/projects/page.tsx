import { Metadata } from "next";
import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
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
          {createProject(
            "Snell's Law",
            "snells.png",
            "A webpage physics demo and data analysis project",
            ["Javascript", "CSS", "Python"],
            "https://www.egr.msu.edu/~fransenq/projects/snells/",
          )}
          {createProject(
            "LeCalculator",
            undefined,
            "A personal project calculator and unit converter with built in Easter Eggs",
            ["Javascript", "CSS"],
            "https://www.egr.msu.edu/~fransenq/projects/LeCalculator/",
          )}
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
            "Big Data project in CSE482 that used machine learning and data processing " +
              "techniques to predict the outcomes of NFL games.",
            ["Python"],
          )}
          {createProject(
            "Backend Web Microservices App",
            undefined,
            undefined,
            ["Python", "SQLite"],
          )}
          {createProject(
            "Autonomous Lane Keeping",
            "autonomous1.png",
            undefined,
            ["ROS2", "Python"],
          )}
          {createProject("Animation Editor", "animation.png", undefined, [
            "C++",
          ])}
          {createProject("Logic Game", "logic-game.png", undefined, ["C++"])}
          {createProject("Popping Blimps", "blimps.png", undefined, ["Java"])}
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
  link?: string,
): JSX.Element {
  const imgPath: string = imageDir + image;
  const alt_description: string = name + "-" + image;
  const sectionId = name.toLowerCase().replace(/\s+/g, "-"); // e.g., "Cool Project" -> "cool-project"

  const visibleTags: number = 3;
  const displayTags = techStack?.slice(0, visibleTags) || [];
  const hiddenTags = techStack?.slice(visibleTags) || [];

  // Define base styling and conditional hover effects
  const baseClasses =
    "project flex flex-col bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden transition-all duration-200 h-full";
  const hoverClasses = link
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" // Movement and heavier shadow if it's a link
    : "hover:shadow-md";
  const cardClasses = `${baseClasses} ${hoverClasses}`;

  const CardContent = (
    <>
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
    </>
  );

  // Return wrapped in Next.js Link if a URL is provided, otherwise return a standard div
  if (link) {
    return (
      <Link
        href={link}
        id={sectionId}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div id={sectionId} className={cardClasses}>
      {CardContent}
    </div>
  );
}
