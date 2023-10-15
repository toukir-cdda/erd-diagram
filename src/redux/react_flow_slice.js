import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ERD_Flow_Data: [],
  nodes: [],
  edges: [],
};

function transformJson(jsonData) {
  // Initialize an empty array to store the transformed data
  const transformedData = [];

  let parentIdCounter = 1;
  let childIdCounter = 1;

  // Iterate through the original JSON data
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      // Create a new object with an 'id' property
      const newObj = {
        id: `parent-id-${parentIdCounter++}`,
        name: key,
        type: "group",
        children: [],
      };

      // Check if the current key has an array of objects
      if (Array.isArray(jsonData[key])) {
        // Iterate through the array and assign IDs to objects
        for (const item of jsonData[key]) {
          const childObj = {
            id: `child-id-${childIdCounter++}`,
            parentId: newObj.id,
            type: "group",
            ...item,
          };
          newObj.children.push(childObj);
        }
      }

      // Push the new object to the transformed data array
      transformedData.push(newObj);
    }
  }

  return transformedData;
}

function convertNodes(graphData) {
  const resultArray = [];

  // Function to recursively extract graphData
  function extractData(graphData, x, y) {
    let distY = 0;
    let distX = 1;
    for (const item of graphData) {
      const id = item.id;
      const content = item.name;
      const data = { ...item };
      const type = item.type ? item.type : "custom";
      const parentNode = item.parentId;
      const extent = "parent";

      if (item.parentId) {
        //childs
        const position = { x: x, y: y * distY };
        resultArray.push({
          id,
          content,
          position,
          type,
          data,
          parentNode,
          extent,
        });
      } else {
        const position = { x: x * distX, y: y };

        //parents
        resultArray.push({
          id,
          content,
          position,
          type,
          data,
        });
      }

      if (item.children && item.children.length > 0) {
        extractData(item.children, x, y);
      }
      distY = distY + 50;
      distX = distX + 190;
    }
  }

  // Call the recursive function
  extractData(graphData, 1, 1);

  // Return the result array
  return resultArray;
}

function createEdges(data, graphNodes) {
  const referenceFieldPairs = [];
  // console.log(graphNodes);
  function traverseData(node) {
    if (node.children) {
      for (const child of node.children) {
        traverseData(child);
      }
    }

    if (node.fields) {
      for (const fieldName in node.fields) {
        const fieldInfo = node.fields[fieldName];

        if (fieldInfo.reference_field) {
          let inputId;
          graphNodes.forEach((item) => {
            if (item.content === fieldInfo.reference_field) {
              return (inputId = item.id);
            }
          });
          // console.log(inputId);
          referenceFieldPairs.push({
            id: `${inputId}-${node.id}`,
            source: inputId,
            target: node.id,
            sourceHandle: `source-handle-${inputId}-${node.id}`,
            style: { stroke: "#fff" },
          });
        }
      }
    }
  }

  // Assuming your JSON data is stored in a variable named 'transformedData'
  const transformedData = data;

  // Start the traversal
  traverseData({ children: transformedData });

  return referenceFieldPairs;
}

const react_flow_slice = createSlice({
  name: "ERD",
  initialState,
  reducers: {
    setErdData: (state, action) => {
      const trnsdata = transformJson(action.payload);
      state.ERD_Flow_Data = trnsdata;
    },
    setInitNodes: (state, action) => {
      const trnsNodes = convertNodes(action.payload);
      const edges = createEdges(state.ERD_Flow_Data, trnsNodes);
      state.nodes = trnsNodes;
      state.edges = edges;

      function generateUniqueID(parentID, childID, fieldNumber) {
        return `${parentID}-${childID}-field-${fieldNumber}`;
      }

      function modifyFields(arr) {
        const modifiedArr = arr.map((item) => {
          const parentID = item.id;
          const children = item.children;

          const modifiedChildren = children.map((child) => {
            const childID = child.id;
            const fields = child.fields;

            const modifiedFields = Object.keys(fields).map(
              (fieldName, index) => ({
                id: generateUniqueID(parentID, childID, index + 1),
                content: fields[fieldName],
                position: index + 1,
                type: fields[fieldName].type,
                data: {},
              })
            );

            return {
              ...child,
              fields: modifiedFields,
            };
          });

          return {
            ...item,
            children: modifiedChildren,
          };
        });

        return modifiedArr;
      }

      // Usage
      const modifiedArr = modifyFields(action.payload);
      console.log(modifiedArr);
    },
  },
});

export const { setErdData, setInitNodes } = react_flow_slice.actions;
export default react_flow_slice.reducer;
