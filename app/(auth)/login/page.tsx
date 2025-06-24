// app/(root)/login/page.tsx
import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (session?.id) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 -z-10 w-full">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white" type="submit">
              <span className="max-sm:hidden">Login dengan Google</span>
              <LogIn className="sm:hidden size-5" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">Login dengan email yang diberikan oleh admin</CardFooter>
      </Card>
    </div>
  );
};

export default page;
