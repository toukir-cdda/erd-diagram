import Image from "next/image";

export default function Home() {
  const erdData = [
    {
      model_name: "user",
      fields: [
        { key: "id", type: "int", value: "PK" },
        {
          key: "username",
          type: "string",
          value: "FK",
          relation: {
            model_name: "user_todo",
            type: "one_to_one", //one_to_one, many_to_many, one_many
          },
        },
        { key: "email", type: "string", value: "required" },
      ],
    },

    {
      model_name: "user_todo",
      fields: [
        { key: "id", type: "int", value: "PK" },
        { key: "user_id", type: "string", value: "FK" },
      ],
    },

    {
      model_name: "task",
      fields: [
        { key: "id", type: "int", value: "PK" },
        { key: "todo_id", type: "string", value: "FK" },
        { key: "email", type: "string", value: "required" },
      ],
    },
  ];

  const entity_relation_diagram = [
    {
      model_name: "user",
      fields: [
        {
          field_name: "id",
          field_type: "int",
          relation_type: "PK",
        },
        {
          field_name: "username",
          field_type: "string",
          relation_type: "FK",
          relation_with: {
            model_name: "user_todo",
            type: "one_to_one", //one_to_one, many_to_many, one_many
          },
        },
        {
          field_name: "email",
          field_type: "string",
          value: "required",
        },
      ],
    },

    {
      model_name: "user_todo",
      fields: [
        {
          field_name: "user_id",
          field_type: "int",
          relation_type: "FK",
        },
        { field_name: "task_id", field_type: "int", relation_type: "FK" },
      ],
    },
  ];

  return <div>home</div>;
}
