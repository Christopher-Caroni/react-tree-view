import './node.scss';

import { PropTypes } from 'prop-types';
import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

import { Container } from '../Container';
import { decoratorsPropType, nodePropType } from '../proptypes';

const getAnimation = node => ({
    enter: {
        animation: 'slideDown',
        duration: 300,
    },
    leave: {
        animation: 'slideUp',
        duration: 300,
    },
});

const Node = ({
    className,
    style,
    expandedNodeIds,
    node,
    onClick,
    depth,
    iconSize,
    headerMarginLeft,
    selectedNodeId,
    decorators,
}) => {
    const isExpanded = expandedNodeIds.includes(node.id);
    const hasChildren = !!node.children;
    const showChildren = hasChildren && isExpanded;
    const { Node: NodeDecorator, Container: ContainerDecorator } = decorators;

    return (
        <div className={`rtv-node ${className}`} style={style}>
            <ContainerDecorator
                expanded={isExpanded}
                node={node}
                onClick={onClick}
                depth={depth}
                iconSize={iconSize}
                headerMarginLeft={headerMarginLeft}
                isSelected={selectedNodeId === node.id}
                decorators={decorators}
            />
            <VelocityTransitionGroup {...getAnimation(node)}>
                {showChildren && (
                    <div className="rtv-node-children">
                        {node.children.map(child => (
                            <NodeDecorator
                                key={child.id}
                                className={className}
                                style={style}
                                expandedNodeIds={expandedNodeIds}
                                node={child}
                                onClick={onClick}
                                depth={depth + 1}
                                iconSize={iconSize}
                                headerMarginLeft={headerMarginLeft}
                                selectedNodeId={selectedNodeId}
                                decorators={decorators}
                            />
                        ))}
                    </div>
                )}
            </VelocityTransitionGroup>
        </div>
    );
};

Node.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    node: nodePropType,
    onClick: PropTypes.func,
    expandedNodeIds: PropTypes.arrayOf(PropTypes.string),
    depth: PropTypes.number,
    iconSize: PropTypes.number,
    headerMarginLeft: PropTypes.number,
    selectedNodeId: PropTypes.string,
    decorators: decoratorsPropType.isRequired,
};

Node.defaultProps = {
    className: '',
    style: undefined,
    node: { id: '', name: '', children: [] },
    onClick: undefined,
    expandedNodeIds: [],
    depth: 0,
    iconSize: 24,
    headerMarginLeft: 10,
    selectedNodeId: undefined,
};

export { Node };
