import Hero from './_components/hero';
import Navbar from './_components/navbar';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center bg-zinc-50 font-sans dark:bg-[#121314]">
      <main className="flex flex-1 w-full max-w-7xl px-6 flex-col items-center min-h-500">
        <Navbar />
        <Hero />
      </main>
    </div>
  );
}
