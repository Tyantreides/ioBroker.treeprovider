import React, { Component } from 'react';
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app

export default class TreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [
                { title: 'Chicken', children: [{ title: 'Egg' }] },
                { title: 'Fish', children: [{ title: 'fingerline' }] },
            ],
        };
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                />
            </div>
        );
    }
}
