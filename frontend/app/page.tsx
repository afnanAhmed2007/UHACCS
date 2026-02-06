import Flow from "./flow";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-full font-sans">
      <main className="min-w-0 flex-1">
        <Flow />
      </main>
      <Sidebar />
    </div>
  );
}

