import './rowStories.scss';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Cell } from '../Cell';
import { Header } from '../Header';
import { dummyNode } from '../stories/node';
import { WithExpandedRowIdsState } from '../stories/WithExpandedRowIdsState';
import { Toggle } from '../Toggle';
import { Row } from './Row';

storiesOf('Row', module)
    .addDecorator(storyFn => <div className="story">{storyFn()}</div>)
    .add('default: !expanded', () => <Row />)
    .add('with node', () => <Row node={dummyNode} />)
    .add('with renderContent', () => (
        <Row node={dummyNode} renderContent={({ node }) => <div>{node.id}</div>} />
    ))
    .add('stateful example', () => (
        <WithExpandedRowIdsState
            renderChildren={(expandedRowIds, toggle) => (
                <Row
                    onClick={node => {
                        action('toggle')(node);
                        toggle(node);
                    }}
                    node={dummyNode}
                    expandedRowIds={expandedRowIds}
                    styles={{
                        content: {
                            height: '30px',
                        },
                    }}
                    renderContent={({ node, hasChildren }) => (
                        <Cell>
                            {hasChildren && <Toggle expanded={Boolean(expandedRowIds[node.id])} />}
                            <div
                                style={{
                                    paddingLeft: '10px',
                                }}
                            >
                                {node.id}
                            </div>
                        </Cell>
                    )}
                />
            )}
        />
    ))
    .add('table example', () => (
        <div>
            <Header className="story-header">
                <Cell className="story-header-cell">Id</Cell>
                <Cell className="story-header-cell">Name</Cell>
            </Header>
            <WithExpandedRowIdsState
                renderChildren={(expandedRowIds, toggle) => (
                    <Row
                        onClick={node => {
                            action('toggle')(node);
                            toggle(node);
                        }}
                        node={dummyNode}
                        expandedRowIds={expandedRowIds}
                        classes={{ content: 'story-row-table-content' }}
                        noIndent
                        renderContent={({ node, hasChildren, indentLeft }) => (
                            <React.Fragment>
                                <Cell
                                    style={{
                                        paddingLeft: `${indentLeft}px`,
                                    }}
                                >
                                    {hasChildren && (
                                        <Toggle expanded={Boolean(expandedRowIds[node.id])} />
                                    )}

                                    <div
                                        style={{
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        {node.id}
                                    </div>
                                </Cell>
                                <Cell>{node.name}</Cell>
                            </React.Fragment>
                        )}
                    />
                )}
            />
        </div>
    ));
