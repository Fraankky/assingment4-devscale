'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'
import loginAction from './action'

export default function Page() {
    const [state, action, pending] = useActionState(loginAction)

  return (
    <main className='space-y-8'>
            <section>
                <h1 className='text-2xl font-bold text-neutral-700 p-2'>Masukkan username admin</h1>
            </section>
            <section >
                <form className='space-y-3 'action={action} >
                    {state?.status === "error" && <p className='text-red-500'>{state?.message}</p>}
                    <Input name="username" placeholder='Username' />
                    <Button type="submit" disabled={pending} className="w-full cursor-pointer">Login</Button>
                </form>
            </section>
        </main>
  )
}
