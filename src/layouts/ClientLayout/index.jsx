import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "./ClientHeader/ClientHeader";
import ClientFooter from "./ClientFooter/ClientFooter";

const ClientLayout = () => {
  return (
    <div className="font-oswald bg-[#f4f4f4]">
      <ClientHeader />

      <Outlet />

      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
