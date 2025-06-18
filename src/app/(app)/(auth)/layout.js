import { Card, CardContent } from "@/components/ui/card";

export default function Layout({ children }) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="hidden md:block md:w-1/2  bg-gradient-to-tr from-indigo-900 via-sky-300 to-lime-200 h-screen " />

      <section className="flex w-full md:w-1/2 justify-center items-center h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
