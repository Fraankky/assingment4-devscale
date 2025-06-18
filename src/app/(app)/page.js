import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-6 text-center bg-gradient-to-tr from-indigo-900 via-sky-300 to-lime-200">
      <div className="max-w-2xl">
        <p className="text-sm mb-2">FUN MINI SOOCER</p>
        <h1 className="font-bold text-3xl mb-6">
          Gabung Sekarang & Rasakan Serunya Main Mini Soccer Bersama Teman Baru
        </h1>
        <div>
          <Link href="/login">
            <Button> List Nama Pemain Disini!</Button>
          </Link>
        </div>
        
      </div>
    </main>
  );
}
