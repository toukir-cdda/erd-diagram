"use client";
import ReactDiagram from "@/components/ReactDiagram";
import React from "react";
import "beautiful-react-diagrams/styles.css";
import erdData from "../../../erd.json";

const Page = () => {
  const demo = {
    nodes: [
      { id: "node-1", content: "Node 1", coordinates: [250, 50] },
      {
        id: "node-2",
        content: "Node 2",
        coordinates: [100, 200],
        outputs: [{ id: "port-1" }],
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
      { input: "node-1", output: "node-2" },
      { input: "node-1", output: "node-3" },
      { input: "node-1", output: "node-4" },
      { input: "port-1", output: "port-2" },
    ],
  };

  function convertGivenDataToGraphData(givenData) {
    const graphData = {
      nodes: [],
      links: [
        { input: "node-1", output: "node-2" },
        { input: "node-1", output: "node-3" },
        { input: "node-1", output: "node-4" },
        { input: "port-1", output: "port-2" },
      ],
    };

    // Iterate through the models in givenData and map them to nodes
    // for (const parentEntity in givenData) {
    //   console.log(givenData[parentEntity]);
    //   graphData.nodes.push({
    //     // data: {
    //     //   id: parentEntity,
    //     //   label: parentEntity,
    //     //   type: "model",
    //     // },

    //         id: 'node-1',
    //         content: 'Start',
    //         coordinates: [100, 150],
    //         outputs: [
    //           { id: 'port-1', alignment: 'right' },
    //           { id: 'port-2', alignment: 'right' },
    //         ],
    //         disableDrag: true,
    //         data: {
    //           foo: 'bar',
    //           count: 0,
    //         }
    //   });

    for (
      let parentEntity = 0;
      parentEntity <= Object.keys(givenData).length - 1;
      parentEntity++
    ) {
      //   console.log(Object.keys(givenData)[parentEntity]);
      const coodinet = Math.round(Math.random(parentEntity + 20) * 30);
      graphData.nodes.push({
        id: parentEntity,
        content: Object.keys(givenData)[parentEntity],
        coordinates: [100 + coodinet, 150 + coodinet],
        outputs: [
          { id: "port-1", alignment: "right" },
          { id: "port-2", alignment: "right" },
        ],
        disableDrag: true,
        data: {
          foo: "bar",
          count: 0,
        },
      });
    }
    // for (const model of givenData[app]) {
    //   graphData.nodes.push({
    //     data: {
    //       id: model.name,
    //       label: model.name,
    //       type: "model",
    //     },
    //   });
    // }

    // Iterate again to map relationships (links) between models
    // for (const app in givenData) {
    //   for (const model of givenData[app]) {
    //     const fields = model.fields;
    //     for (const fieldName in fields) {
    //       const field = fields[fieldName];
    //       if (field.type === "ForeignKey" || field.type === "ManyToManyField") {
    //         // Add an edge between models
    //         graphData.links.push({
    //           data: {
    //             source: model.name,
    //             target: field.reference_field,
    //             label: fieldName,
    //           },
    //         });
    //       }
    //     }
    //   }
    // }

    return graphData;
  }

  const convertedGraphData = convertGivenDataToGraphData(erdData);
  console.log(convertedGraphData);
  return (
    <div>
      <ReactDiagram convertedGraphData={convertedGraphData} />
    </div>
  );
};

export default Page;
