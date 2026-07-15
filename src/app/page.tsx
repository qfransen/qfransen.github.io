import SplashScreen from "@/app/ui/SplashScreen";
import Link from "next/link";

export default function Home() {
  return (
    <main className={"flex flex-col items-center justify-center px-4"}>
      <SplashScreen />
      <h1>This is my website</h1>
      <h2 className="mb-10 text-center">
        It&apos;s certainly a work in progress, but feel free to take a look
        around.
      </h2>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8 text-xl mt-8 w-full max-w-4xl justify-center items-center">
        <Link
          href="/cv"
          className="[&::after]:hidden border border-border p-6 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-center w-64 shadow-sm"
        >
          View My CV
        </Link>
        <Link
          href="/projects"
          className="[&::after]:hidden border border-border p-6 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-center w-64 shadow-sm"
        >
          Explore Projects
        </Link>
        <Link
          href="/hire"
          className="[&::after]:hidden border border-border p-6 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-center w-64 shadow-sm"
        >
          Contact / Hire Me
        </Link>
      </div>
    </main>
  );
}
