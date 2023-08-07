import { Posts, Tags } from "@/components/home";

export default function Home() {
  return (
    <main>
      <div className="flex gap-10 max-w-[1200px] mx-auto my-10">
        {/*{isLoading ||*/}
        {/*  (isError && (*/}
        {/*    <div className="w-full h-[200px] flex items-center justify-center">*/}
        {/*      {isLoading && <Loading />}*/}
        {/*      {isError && <p>{error.message}</p>}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        <Tags />
        <Posts />
      </div>
    </main>
  );
}
