"use client";
import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";

const ReactDiagram = ({ convertedGraphData }) => {
  // the diagram model
  console.log(convertedGraphData);

  //     {
  //     nodes: [
  //       { id: "node-1", content: "Node 1", coordinates: [250, 50] },
  //       {
  //         id: "node-2",
  //         content: "Node 2",
  //         coordinates: [100, 200],
  //         outputs: [{ id: "port-1" }],
  //       },
  //       {
  //         id: "node-3",
  //         content: "Node 3",
  //         coordinates: [250, 220],
  //         inputs: [{ id: "port-2" }],
  //       },
  //       { id: "node-4", content: "Node 4", coordinates: [400, 200] },
  //     ],
  //     links: [

  //       { input: "node-1", output: "node-2" },
  //       { input: "node-1", output: "node-3" },
  //       { input: "node-1", output: "node-4" },
  //       { input: "port-1", output: "port-2" },
  //     ],
  //   }

  const initialSchema = createSchema(convertedGraphData);
  const [schema, { onChange }] = useSchema(initialSchema);
  return (
    <div style={{ height: "22.5rem" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default ReactDiagram;
