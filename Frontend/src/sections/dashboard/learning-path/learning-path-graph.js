import { Card, CardContent } from "@mui/material";
import React, { useCallback, useLayoutEffect, useEffect, memo } from 'react';
import ELK from 'elkjs/lib/elk.bundled.js';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
//   NodeResizer,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

const elk = new ELK();
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'node 1' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
];

export const initialEdges = [
    { id: 'e13', source: '1', target: '3', type: 'smoothstep' },
    { id: 'e12', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e22', source: '2', target: '3', type: 'smoothstep' },
];

const getLayoutedElements = (nodes, edges, options = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
        ...node,
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',

        width: 150,
        height: 50,
    })),
    edges: edges,
    };

    return elk
    .layout(graph)
    .then((layoutedGraph) => ({
        nodes: layoutedGraph.children.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
        })),

        edges: layoutedGraph.edges,
    }))
    .catch(console.error);
}

const LearningPathEdge = () => {};

const LearningPathNode = memo(({ data }) => {
    return (
    <>
        <LearningPathLockedLOs/>
        <NodeResizer minWidth={50} minHeight={50} />
        <Handle type="target" position={Position.Left} />
        <div style={{ padding: 10 }}>{data.label}</div>
        <div
        style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            justifyContent: 'space-evenly',
            left: 0,
        }}
        >
        <Handle
            style={{ position: 'relative', left: 0, transform: 'none' }}
            id="a"
            type="source"
            position={Position.Bottom}
        />
        </div>
    </>
    );
})

const Flow = ({LOs}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = {
        loNode: LearningPathNode,
    };
    const { fitView } = useReactFlow();
    
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const onLayout = useCallback(
        ({ direction, useInitialNodes = false }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            const ns = useInitialNodes ? initialNodes : nodes;
            const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(ns, es, opts)?.then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                setNodes(layoutedNodes);
                setEdges(layoutedEdges);

                window.requestAnimationFrame(() => fitView());
            });
        },
    [nodes, edges]
    );

    useLayoutEffect(() => {
        onLayout({ direction: 'DOWN', useInitialNodes: true });
    }, []);

    // useEffect(() => {
    //     let node = [], edge =[]
    //     for (let i = 0; i < LOs.length - 1; i++) {
    //         node.push({id: `${LOs[i].id}`, position: position, data: {label: LOs[i].name}})
            
    //         edge.push({
    //             id: `e${LOs[i].id}-${LOs[i + 1].id}`, 
    //             source: `${LOs[i].id}`, 
    //             target: `${LOs[i + 1].id}`,
    //             type: 'smoothstep'
    //         })
    //     }

    //     setNodes(node)
    //     setEdges(edge)
    // }, [LOs])

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
            // fitView={true}
        >
            <Controls />
            {/* <Background variant="dots" gap={12} size={1} /> */}
            <Panel position="top-right">
                <button onClick={() => onLayout({ direction: 'DOWN' })}>vertical layout</button>
                <button onClick={() => onLayout({ direction: 'RIGHT' })}>horizontal layout</button>
            </Panel>
        </ReactFlow>
    )
}

export const LearningPathGraph = (props) => {
    const {LOs} = props;
    
    return (
        <Card>
            <CardContent style={{height: '800px'}}>
                <ReactFlowProvider>
                    <Flow LOs={LOs}/>
                </ReactFlowProvider>
            </CardContent>
        </Card>
    )
}