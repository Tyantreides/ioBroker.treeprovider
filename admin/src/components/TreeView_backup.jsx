import React, { Component } from 'react';
import SortableTree from '@nosferatu500/react-sortable-tree';

export default class TreeView_backup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [
                {
                    title: 'Rabbithome',
                    children: [
                        {
                            title: 'Innenbereich',
                            children: [
                                { title: 'Obergeschoss 1' },
                                { title: 'Obergeschoss 2' },
                                { title: 'Dachgeschoss' },
                            ]
                        },
                        { title: 'Aussenbereich' }
                    ]
                },
            ],
        };
    }

    render() {
        return (
            <div style={{ height: 800 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    generateNodeProps={(rowInfo) => ({
                        buttons: [
                            <div>
                                <button
                                    style={{ margin: "0 3px" }}
                                    label="Delete"
                                    onClick={() => console.log(rowInfo)}
                                >
                                    X
                                </button>
                                <button
                                    style={{ margin: "0 3px" }}
                                    label="Delete"
                                    onClick={() => console.log(rowInfo)}
                                >
                                    Edit
                                </button>
                            </div>
                        ],
                        style: {
                            height: "50px"
                        }
                    })}
                />
            </div>
        );
    }
}
