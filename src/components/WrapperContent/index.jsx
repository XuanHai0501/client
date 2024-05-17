import classNames from "classnames";
import React from "react";

const WrapperContent = ({ children, className }) => {
  return <div className={classNames("container-base", className)}>{children}</div>;
};

export default WrapperContent;
