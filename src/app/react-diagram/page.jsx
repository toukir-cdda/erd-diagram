"use client";
import ReactDiagram from "@/components/ReactDiagram";
import React from "react";
import "beautiful-react-diagrams/styles.css";
import erdData from "../../../erd.json";

const Page = () => {
  const demo = {
    nodes: [
      { id: "1", content: "Node 1", coordinates: [250, 50] },
      {
        id: "2",
        content: "Node 2",
        coordinates: [100, 200],
        // outputs: [{ id: "port-1" }],
      },
      {
        id: "node-3",
        content: "Node 3",
        coordinates: [250, 220],
        inputs: [{ id: "port-2" }],
      },
      { id: "node-4", content: "Node 4", coordinates: [400, 200] },
    ],
    links: [
      { input: "1", output: "2" },
      // { input: "node-1", output: "node-3" },
      // { input: "node-1", output: "node-4" },
      // { input: "port-1", output: "port-2" },
    ],
  };

  return (
    <div>
      <ReactDiagram demo={demo} />
    </div>
  );
};

export default Page;
