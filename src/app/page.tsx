import { Posts, Tags } from "@/components/home";

export default function Home() {
  return (
    <main>
      <div className="flex gap-10 max-w-[1200px] mx-auto my-10">
        {/*<Tags />*/}
        <Posts />
      </div>
    </main>
  );
}
