import Navbar from "@/components/navbar";
import Upload from "@/components/upload";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-24 py-8">
        <div className="flex justify-between">
          <div></div>
          <Upload />
        </div>

      </main>
    </>
  );
}
