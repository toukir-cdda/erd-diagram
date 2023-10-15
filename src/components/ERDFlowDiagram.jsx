"use client";
import { setInitNodes } from "@/redux/react_flow_slice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import CustomGroup from "./CustomGroup";
const nodeTypes = {
  custom: CustomNode,
  group: CustomGroup,
};

const ERDFlowDiagram = () => {
  const dispatch = useDispatch();
  //redux start here
  const {
    ERD_Flow_Data,
    nodes: initNodes,
    edges: initEdges,
  } = useSelector((state) => state.flowData);
  //   console.log(ERD_Flow_Data);
  //   console.log(nodes);

  useEffect(() => {
    if (ERD_Flow_Data.length > 0) {
      dispatch(setInitNodes(ERD_Flow_Data));
    }
  }, [ERD_Flow_Data]);

  function transformData(inputData) {
    const resultArray = [];

    function processNode(parent, parentID) {
      if (parent) {
        // Generate a unique ID
        const uniqueID = `${parentID}-${parent.name}-${Math.floor(
          Math.random() * 1000
        )}`;

        // Create an object for the current parent
        const nodeObject = {
          id: uniqueID,
          content: parent.name,
          fields: [],
        };
        let fieldIdCounter = 1;
        // push all fields on result array
        for (const key in parent.fields) {
          nodeObject.fields.push({
            field_id: `${parent.name}-field-id-${fieldIdCounter++}`,
            [key]: parent.fields[key],
          });
          resultArray.push({
            field_id: `${parent.name}-field-id-${fieldIdCounter++}`,
            [key]: parent.fields[key],
          });
        }

        // push parentes on result array
        resultArray.push({ ...parent });

        // Recursively process children
        if (parent.children && parent.children.length > 0) {
          for (const child of parent.children) {
            processNode(child, child.id);
          }
        }
      }
    }

    // Start processing the transformedData
    for (const parent of inputData) {
      processNode(parent, parent.id);
    }

    // Return the resulting array
    return resultArray;
  }

  const res = transformData(ERD_Flow_Data);
  console.log(res);
  // const [nodes, setnewNodes] = useState(initNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [edges, setEdges] = useState(initEdges);

  // const onNodesChange = useCallback(
  //   (changes) => setnewNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setnewNodes]
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  useEffect(() => {
    // setnewNodes(initNodes);
    setNodes(initNodes);
    setEdges([]);
  }, [initNodes, initEdges]);
  // console.log(nodes);
  // console.log(initEdges);

  const edgeOptions = {
    animated: true,
    style: {
      stroke: "white",
    },
  };

  const connectionLineStyle = { stroke: "white" };

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="bg-slate-400"
        fitView
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        connectionLineStyle={connectionLineStyle}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ERDFlowDiagram;
