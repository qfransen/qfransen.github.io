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
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-12 text-xl mt-8">
        <Link href="/cv">View My CV</Link>
        <Link href="/projects">Explore Projects</Link>
        <Link href="/hire">Contact / Hire Me</Link>
      </div>
    </main>
  );
}
