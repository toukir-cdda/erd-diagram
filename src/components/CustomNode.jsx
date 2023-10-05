import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  console.log("Node data : ", data);
  return (
    <div>
      <span className="font-bold">{data.name}</span>
      <div className="flex flex-col">
        {Object.keys(data.fields).map((field, idx) => (
          <span key={idx}>{field}</span>
        ))}
      </div>
    </div>
  );
};

export default CustomNode;
