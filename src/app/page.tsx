import { Posts, Tags } from "@/components/home";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 container my-4 lg:my-10">
        <Tags />
        <Posts />
      </div>
    </main>
  );
}
