import Download from "@/components/download";
import Navbar from "@/components/navbar";
import Share from "@/components/share";
import Upload from "@/components/upload";
import View from "@/components/view";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-24 py-8">
        <div className="flex justify-between">
          <div></div>
          <Upload />
        </div>
        <div className="flex flex-col gap-12 py-24" >
          <View />
          <Download />
          <Share />
        </div>
      </main>
    </>
  );
}
