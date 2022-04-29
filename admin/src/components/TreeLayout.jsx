import React, { useState } from "react";
//import "react-sortable-tree/style.css";
import TreeView from "./TreeView/TreeView";
import NodeEditor from "./TreeView/NodeEditor";
//import "./styles.css";
//import { arrayMove } from "react-sortable-hoc";
import { removeNodeAtPath } from "@nosferatu500/react-sortable-tree";

const TreeLayout = (props) => {
    const initialData = [
        {
            title: "Data_1",
            id: 0,
            children: [
                {
                    id: 0,
                    title: "Data_1-1"
                }
            ]
        },
        {
            id: 1,
            title: "Data_2"
        },
        {
            id: 2,
            title: "Data_3"
        }
    ];
    const [treeData, settreeData] = useState(initialData);
    const [action, setaction] = useState("add");
    const [currentNodeItem, setcurrentNodeItem] = useState("");
    const [currentNodeIndex, setcurrentNodeIndex] = useState();
    const [parentNodeIndex, setparentNodeIndex] = useState();

    const updateTreeData = (data) => {
        settreeData([...data]);
    };

    const EditNode = (rowInfo) => {
        console.log(rowInfo)
        if (rowInfo.parentNode !== null && rowInfo.parentNode !== undefined ) {
            const i = treeData.findIndex((a) => a.id === rowInfo.parentNode.id);
            const j = treeData[i].children.findIndex((a) => a.id === rowInfo.node.id);
            const title = treeData[i].children[j].title;
            setparentNodeIndex(i);
            setcurrentNodeIndex(j);
            setcurrentNodeItem(title);
            setaction("edit");
        } else {
            const i = treeData.findIndex((a) => a.id === rowInfo.node.id);
            setcurrentNodeIndex(i);
            setcurrentNodeItem(treeData[i].title);
            setaction("edit");
        }
    };

    const removeNode = (rowInfo) => {
        let { treeIndex, path, node } = rowInfo;
        settreeData(
            removeNodeAtPath({
                treeData: treeData,
                path: path,
                getNodeKey: ({ treeIndex: number, node: TreeNode }) => {
                    return number;
                },
                ignoreCollapsed: false
            })
        );
    };

    const updateNode = (data) => {
        if (action === "edit") {
            let tree = treeData;
            if (parentNodeIndex !== undefined) {
                tree[parentNodeIndex].children[currentNodeIndex].title = data;
            } else {
                tree[currentNodeIndex].title = data;
            }
            settreeData([...tree]);
            setaction("add");
            setparentNodeIndex();
        } else {
            settreeData([...treeData, { id: treeData.length, title: data }]);
            setaction("add");
        }
    };

    return (
        <div>
            <div className="add-dt">
                <div className="left-side">
                    <NodeEditor
                        value={currentNodeItem}
                        updateNode={(data) => updateNode(data)}
                        action={action}
                    />
                </div>
                <div className="right-side">
                    <TreeView
                        data={treeData}
                        EditNode={EditNode}
                        removeNode={removeNode}
                        updateTreeData={updateTreeData}
                    />
                </div>
            </div>
        </div>
    );
};

export default TreeLayout;
