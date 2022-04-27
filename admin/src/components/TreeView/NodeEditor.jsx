import React, { useEffect, useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton, Stack } from "@fluentui/react";
//import "./styles.css";

const NodeEditor = ({ value, updateNode, action }) => {
    // console.log(value, "value1");
    // console.log(updateNode, "updateNode1");
    // console.log(action, "action1");
    const [val, setval] = useState(action === "add" ? "" : value);

    const onchange = (event) => {
        //console.log(val, "onchange");
        setval(event.target.value);
    };

    useEffect(() => {
        setval(value);
    }, [value]);

    //console.log(val, "vallll");

    return (
        <Stack horizontal>
            <Stack className="add-inp">
                <TextField
                    id="commentForm"
                    name="title"
                    onChange={onchange}
                    value={val}
                />
                <span id="error_name"></span>
                <PrimaryButton
                    text="Update"
                    className="add-btn"
                    onClick={() => {
                        updateNode(val);
                        setval("");
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default NodeEditor;
