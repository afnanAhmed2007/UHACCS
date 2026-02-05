import Image from "next/image";

async function getData() {
  const response = await fetch("http://localhost:8000/");
  const data = await response.json();
  return data;
}

export default function Home() {
  const data = getData();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black">
      <h1>{data}</h1>
    </div>
  );
}

