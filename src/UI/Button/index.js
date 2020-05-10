import React from "react";
import classnames from "classnames";
import "./styles.css";

const Button = ({command, onClick, children, active}) =>{
    return (
        <button
            className={classnames({"format-action button":true, "active": active})}
            data-command={command}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    )
}

export default Button;
