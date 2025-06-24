import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const SignOut = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button className="bg-red-100 flex items-center gap-3 p-2 rounded-md hover:bg-red-100 text-red-500 mt-10">
          <LogOut size={18} /> Logout
        </Button>
      </form>
    </>
  );
};

export default SignOut;
