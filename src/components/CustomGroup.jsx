import React from "react";
const getTotalFieldCount = (childData) => {
  let totalFieldCount = 0;
  let totalNameCount = 0;

  // Iterate through the objects and count the fields
  childData.forEach((obj) => {
    if (obj.fields) {
      totalFieldCount += Object.keys(obj.fields).length;
    }
    if (obj.name) {
      totalNameCount = totalNameCount + 1;
    }
  });
  //   console.log(totalNameCount);
  return totalFieldCount + totalNameCount;
};

const CustomGroup = ({ data }) => {
  // console.log(data);
  // const childrenLength = data?.children.length;
  // const childrenFieldsCount = getTotalFieldCount(data?.children);
  //   console.log(childrenFieldsCount);
  return (
    <div
      //   className="w-full h-auto"
      style={
        {
          // width: 400,
          // height: 45 * childrenFieldsCount,
        }
      }
    >
      {data.name}
    </div>
  );
};

export default CustomGroup;
