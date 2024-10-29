"use client";

import { createCommunity2 } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initalState = {
  message: "",
  status: "",
};

export default function CommunityCreationPage() {
  const [state, formAction] = useFormState(createCommunity2, initalState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  return (
    <div className="max-w-[1000px] mx-auto  flex flex-col mt-4">
      <form action={formAction}>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Create Community
        </h1>
        <Separator className="my-4" />
        <Label className="text-lg">Name</Label>
        <p className="text-muted-foreground">
          Community names including capitalization cannot be changed!
        </p>

        <div className="relative mt-3">
          <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
            b/
          </p>
          <Input
            name="name"
            required
            className="pl-6"
            placeholder="Like Metals, Reliance, etc."
            minLength={2}
            maxLength={31}
          />
        </div>
        <div className="relative mt-3">
          <Input
            name="description"
            type="textarea"
            placeholder="Description"
            className="pl-6"
            minLength={20}
            maxLength={200}
          />
        </div>
        <p className="mt-1 text-destructive">{state.message}</p>

        <div className="w-full flex mt-5 gap-x-5 justify-end">
          <Button variant="secondary" asChild>
            <Link href="/stock-arena">Cancel</Link>
          </Button>
          <SubmitButton text="Create Community" />
        </div>
      </form>
    </div>
  );
}
