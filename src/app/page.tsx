import SplashScreen from "@/app/ui/SplashScreen";

export default function Home() {
  return (
    <main className={"flex flex-col items-center justify-center"}>
      <SplashScreen />
      <h1>This is my website</h1>
      <h2>It&apos;s certainly a work in progress, but feel free to take a look around.</h2>
    </main>
  );
}
