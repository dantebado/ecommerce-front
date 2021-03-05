import React from "react";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

function DefaultLayout(props) {
  return (
    <div>
      <DefaultHeader />
      <div className="dark:bg-gray-700">{props.children}</div>
      <DefaultFooter />
    </div>
  );
}

export default DefaultLayout;
