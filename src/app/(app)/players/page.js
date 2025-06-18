"use server"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getUsername } from '@/utils/getUsername';
import Link from 'next/link';
import { AddPlayer, DeletePlayer } from './form';

export default async function Page() {
  const username = await getUsername();

  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/pEbaay3ODtsk`
  );
  const { data: players } = await res.json();

  return (
    <main className='max-w-2xl mx-auto py-10'>
      <div className='space-y-2'>
        <div className='flex justify-between mb-8'>
          <h1 className='font-bold text-2xl'>List Pemain</h1>
          <AddPlayer />
        </div>
        {players.map((player) => {
          return (
            <Card key={player._id}>
              <CardContent className="space-y-1">
                <div className="font-medium text-lg">
                  Nama : {player.name_0}
                </div>
                <p className="text-sm">
                  Usia : {player.age_0}
                </p>
                <p className="text-sm">
                  Posisi : {player.position}
                </p>
                <p className="text-sm text-gray-500">
                  No Telp : {player.notelp}
                </p>
                <div className="flex justify-end space-x-3">
                  <Link href={`/players/${player._id}`}>
                    <Button className="cursor-pointer">Edit Pemain</Button>
                  </Link> 
                  <DeletePlayer id={player._id} />      
                </div>
              </CardContent>
            </Card>
          );
        })}
        <div>
        </div>
      </div>
    </main>
  )
}
