import React, { useState, useEffect } from "react";
//import "react-sortable-tree/style.css";
import SortableTree from "@nosferatu500/react-sortable-tree";
import { toggleExpandedForAll } from "@nosferatu500/react-sortable-tree";
//import "./styles.css";

const TreeView = ({ data, EditNode, removeNode, updateTreeData }) => {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        setTreeData(data);
    }, [data]);

    // Expand and collapse code
    const expand = (expanded) => {
        setTreeData(
            toggleExpandedForAll({
                treeData: treeData,
                expanded
            })
        );
    };

    const expandAll = () => {
        expand(true);
    };

    const collapseAll = () => {
        expand(false);
    };

    // Expand and collapse code  end

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ flex: "0 0 auto", padding: "0 15px" }}>
                <h3>Full Node Drag Theme</h3>
                <button onClick={expandAll}>Expand All</button>
                <button onClick={collapseAll}>Collapse All</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div style={{ flex: "1 0 50%", padding: "0 0 0 15px" }}>
                <SortableTree
                    className="tree-dt"
                    id="add_name"
                    treeData={treeData}
                    onChange={updateTreeData}
                    generateNodeProps={(rowInfo) => ({
                        buttons: [
                            <div>
                                <button
                                    style={{ margin: "0 3px" }}
                                    label="Delete"
                                    onClick={() => removeNode(rowInfo)}
                                >
                                    X
                                </button>
                                <button
                                    style={{ margin: "0 3px" }}
                                    label="Delete"
                                    onClick={() => {
                                        EditNode(rowInfo)
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ],
                        style: {
                            height: "50px"
                        }
                    })}
                    canDrag={({ node }) => !node.dragDisabled}
                />
            </div>
        </div>
    );
};

export default TreeView;
