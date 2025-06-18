"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { updatePlayerAction } from "./action";
import { toast } from "sonner";

export default function FormEdit({ players }) {
  const [state, action, pending] = useActionState(updatePlayerAction, null);
  
  const [formData, setFormData] = useState({
    name_0: players?.name_0 || "",
    age_0: players?.age_0 || "",
    position: players?.position || "",
    notelp: players?.notelp || ""
  });

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
    }
    if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="space-y-4" action={action}>
      <input 
        type="hidden" 
        name="playerId" 
        value={players?._id} 
      />
      
      <Input 
        name="name_0" 
        value={formData.name_0}
        onChange={handleInputChange}
        placeholder="Name"
        required 
      />
      <Input 
        name="age_0" 
        value={formData.age_0}
        onChange={handleInputChange}
        placeholder="Age"
        type="number"
        required 
      />
      <Input
        name="position"
        value={formData.position}
        onChange={handleInputChange}
        placeholder="Position"
        required
      />
      <Input
        name="notelp"
        value={formData.notelp}
        onChange={handleInputChange}
        placeholder="No. Telepon"
        required
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Updating..." : "Edit Player"}
      </Button>
    </form>
  );
}