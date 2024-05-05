import React from "react";
import classes from "./button.module.css";
import { ButtonProps, Button as MuiButton } from "@mui/material";
import clsx from "classnames";

const Button = React.memo((props: ButtonProps) => {
  const { className, color, children, size, style, ...otherProps } = props;

  return (
    <MuiButton
      {...otherProps}
      className={clsx(classes.button, className, {
        [classes.buttonPrimary]: color === "primary",
        [classes.sizeLarge]: size === "large",
      })}
      style={style}
    >
      {children}
    </MuiButton>
  );
});

export default Button;
