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
            "LeCalculator.png",
            "A personal project calculator and unit converter with built in Easter Eggs",
            ["Javascript", "CSS"],
            "https://www.egr.msu.edu/~fransenq/projects/LeCalculator/",
          )}
          {createProject(
            "CAV Traffic Light Attack Simulation",
            "intersection.png",
            "CSE 834",
            ["Javascript", "CSS"],
            "https://www.egr.msu.edu/~fransenq/projects/intersection/",
          )}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 border-b pb-2">School Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createProject(
            "Traffic Accident Simulation Paper",
            "SUMO_gifStill.png",
            "A group project in CSE 834 where we attempted to create a novel simulation. This " +
              "research addresses the impact of the levels of connectivity when there is an accident on a " +
              "large throughput highway.",
            ["SUMO", "Python"],
            "https://github.com/qfransen/CSE834_Experiment",
          )}
          {createProject(
            "Flight Delay Predictor",
            "weather.png",
            "Project for CSE 881 which is a flight delay prediction application that evaluates the risk of a delay " +
              "by combining historical flight records with weather conditions. " +
              "It fetches weather information and derives temporal features to feed into a pre-trained machine " +
              "learning pipeline.",
            ["Python", "scikit-learn", "Streamlit"],
            "https://weather-or-not-ish48lyykk4yi3g4hacmbr.streamlit.app/",
          )}
          {createProject(
            "Nuclear Energy Website",
            "capstone.png",
            <>
              An interactive nuclear energy demo designed to promote nuclear
              energy in the state of Michigan. We built this in collaboration
              with the{" "}
              <a
                href="https://anthropoceneinstitute.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthropocene Institute
              </a>{" "}
              in our capstone class at MSU (CSE 498).
            </>,
            ["React"],
          )}
          {createProject(
            "Car Image Classifier",
            "car-classifier.png",
            "This project for CSE 404 focuses on vehicle classification through image recognition, utilizing a " +
              "Convolutional Neural Network (CNN) to identify the make and model of cars from the high-resolution " +
              "Stanford Cars dataset.",
            ["Python", "Tensorflow", "Keras"],
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
            "Architected and developed a backend for a grocery store application utilizing 5 distinct, " +
              "publicly addressable microservices. Implemented secure user authentication and authorization " +
              "and combined everything using Docker Compose. Developed in CSE 380.",
            [
              "Python",
              "SQLite",
              "Flask",
              "Docker",
              "JSON Web Tokens (JWT)",
              "RESTful APIs",
            ],
          )}
          {createProject(
            "Autonomous Lane Keeping",
            "autonomous1.png",
            "Simulated a lane keeping robot with dashed-lines for lanes. We used ROS2 to control the " +
              "turtlebot simualtion. Project was for CSE 434.",
            ["ROS2", "Python", "Gazebo Simulation"],
          )}
          {createProject(
            "Animation Editor",
            "animation.png",
            "Final project for CSE 335. Created an animation editor and playback machine using " +
              "object-oriented programming principles.",
            ["C++"],
          )}
          {createProject(
            "Logic Game",
            "logic-game.png",
            "Team project in CSE 335. Created a game where the user adds in logic gates and " +
              "our code responds the circuit output.",
            ["C++"],
          )}
          {createProject(
            "Popping Blimps",
            "blimps.png",
            "Game project from Delta's 184 course. Made fun of the 'Chinese spy blimp' in early 2023.",
            ["Java"],
          )}
        </div>
      </section>
    </div>
  );
}

function createProject(
  name: string,
  image?: string,
  description?: React.ReactNode,
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
