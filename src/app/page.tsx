import { Posts, Tags } from "@/components/home";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row gap-10 container my-10">
        <Tags />
        <Posts />
      </div>
    </main>
  );
}
