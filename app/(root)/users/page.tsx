import UserList from "@/components/UserList";
import React from "react";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UserList />
      </div>
    </>
  );
};

export default page;
