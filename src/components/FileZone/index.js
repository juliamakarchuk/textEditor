import React, { Component } from "react";
import "./styles.css";

class FileZone extends Component {

    render() {
        return (
            <div id="file-zone">
                <div id="file"
                    contentEditable="true"
                    >
                </div>
            </div>
        );
    }
}

export default FileZone;
