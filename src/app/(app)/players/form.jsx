"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useRef } from "react";
import { createPlayerAction, deletePlayerAction } from "./action";
import { toast } from "sonner";

export const AddPlayer = () => {
  const [state, action, pending] = useActionState(createPlayerAction, null);
  const formRef = useRef(null);
  const closeRef = useRef(null);
  
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
      // Reset form dan tutup dialog
      formRef.current?.reset();
      closeRef.current?.click();
    } else if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <Dialog className="space-y-12">
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Daftar Pemain</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] space-y-6">
        <form ref={formRef} action={action}>
          <DialogHeader>
            <DialogTitle>Daftar pemain</DialogTitle>
            <DialogDescription>
              Masukkan data yang sesuai, dan bersenang-senanglah di fun
              minisoccer ini
            </DialogDescription>
          </DialogHeader>
          
          {state?.status === "error" && (
            <p className="text-red-700 mb-4">{state?.message}</p>
          )}
          
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name_0">Name</Label>
              <Input id="name_0" name="name_0" defaultValue="" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="age_0">Age</Label>
              <Input id="age_0" name="age_0" type="number" defaultValue="" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" defaultValue="" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="notelp">No telp</Label>
              <Input id="notelp" name="notelp" type="tel" defaultValue="" required />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose ref={closeRef} asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              {pending ? "Menambahkan..." : "Tambah Pemain"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export const DeletePlayer = ({id}) => {
  const handleDelete = (e) => {
    e.preventDefault();
    
    toast("Yakin hapus pemain ini?", {
      action: {
        label: "Hapus",
        onClick: () => {
          e.target.closest('form').submit();
          toast.success("Pemain dihapus!");
        }
      },
      cancel: { label: "Batal" }
    });
  };

  return (
    <form action={deletePlayerAction}>
      <Input hidden name="id" value={id} readOnly />
      <Button className="cursor-pointer" variant="destructive" onClick={handleDelete}>
        Hapus
      </Button>
    </form>
  );
}