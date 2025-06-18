"use server";

import { Card, CardContent } from "@/components/ui/card";
import FormEdit from "./formEdit";

export default async function PlayerDetail({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/pEbaay3ODtsk/${id}`
  );
  const players = await res.json();

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6 mt-8">
      <Card>
        <h1 className="text-2xl font-bold px-7">Edit profile pemain</h1>
        <CardContent>
          <FormEdit players={players} />
        </CardContent>
      </Card>
    </main>
  );
}
