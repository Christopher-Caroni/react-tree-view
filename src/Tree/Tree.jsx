import './tree.scss';

import PropTypes from 'prop-types';
import React from 'react';

import { Node } from '../Node';
import { nodePropType } from '../proptypes';

class Tree extends React.Component {
    state = {
        expandedNodeIds: this.props.defaultExpandRoot ? [this.props.node.id] : [],
        selectedNodeId: undefined,
    };

    onClick = node =>
        this.setState(({ expandedNodeIds }) => ({
            expandedNodeIds: expandedNodeIds.includes(node.id)
                ? expandedNodeIds.filter(id => id !== node.id)
                : [...expandedNodeIds, node.id],
            selectedNodeId: node.id,
        }));

    render() {
        const { className, style, node, iconSize, headerMarginLeft } = this.props;
        const { expandedNodeIds, selectedNodeId } = this.state;

        return (
            <div className={`rtv-tree ${className}`} style={style}>
                {!!node && (
                    <Node
                        expandedNodeIds={expandedNodeIds}
                        node={node}
                        onClick={this.onClick}
                        depth={0}
                        iconSize={iconSize}
                        headerMarginLeft={headerMarginLeft}
                        selectedNodeId={selectedNodeId}
                    />
                )}
            </div>
        );
    }
}

Tree.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    node: nodePropType,
    defaultExpandRoot: PropTypes.bool,
};

Tree.defaultProps = {
    className: '',
    style: undefined,
    node: undefined,
    defaultExpandRoot: false,
};

export { Tree };
