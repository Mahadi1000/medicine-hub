import React, { useState } from "react";
import { MobileSidebar } from "./mobileSiderbar";

const navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center  text-gray-900 dark:text-white shadow-sm">
      <MobileSidebar />

    </div>
  );
};

export default navbar;
