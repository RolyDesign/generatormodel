export const schema ={
  type: "object",
  properties: {
    Name: {
      description: "Name of the entity",
      type: "string"
    },
    PluralName: {
      description: "Plural name of the entity",
      type: "string"
    },
    Fields: {
      description: "Fields to the entity",
      type: "array",
      items: {
        type: "object",
        properties: {
          AvilitarValidators: {
            description: "Name for the field",
            type: "boolean"
          },
          Name: {
            description: "Name for the field",
            type: "string"
          },
          DisplayName: {
            description: "Name for the field in the view ",
            type: "string"
          },
          Type: {
            description: "Data type for the field ",
            type: "string",
            enum: [
              "boolean",
              "string",
              "number",
              "any",
              "customType",
              "date",
              "Array<number>",
              "Array<string>",
              "Array<any>",
              "Array<boolean>",
              "boolean[]",
              "number[]",
              "any[]",
              "string[]"
            ]
          },
          DisplayType: {
            description: "Element html to use in the view ",
            type: "object",
            properties: {
              Element: {
                description: "Name of the Element html",
                type: "string",
                enum: [
                  "input",
                  "select",
                  "textarea"
                ]
              },
              ElementType: {
                description: "Type of Input (Element html)",
                type: "string",
                enum: [
                  "button",
                  "checkbox",
                  "color",
                  "date",
                  "datetime-local",
                  "week",
                  "time",
                  "month",
                  "email",
                  "file",
                  "hidden",
                  "image",
                  "number",
                  "password",
                  "radio",
                  "range",
                  "reset",
                  "search",
                  "submit",
                  "tel",
                  "text",
                  "url"
                ]
              },
              OptionsSelected: {
                description: "Options for select (Element html)",
                type: "array",
                items: {
                  type: "string"
                },
                minItems: 1,
                uniqueItems: true
              },
              FileOptions: {
                description: "Options for input type file (Element html)",
                type: "object",
                properties: {
                  "TypeFile":{
                    "type":"string",
                    "enum":["imgFile", "textFile"]
                  }
                },
                required: [
                  "TypeFile"
                ],
                additionalProperties: false
              }
            },
            required: [
              "Element"
            ],
            additionalProperties: false
          },
          Validators: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "min",
                "max",
                "required",
                "requiredTrue",
                "email",
                "minLength",
                "maxLength",
                "pattern",
                "maxSizeFile",
                "typeFile",
                "minDate",
                "maxDate"
              ]
            },
            minItems: 1,
            uniqueItems: true
          },
          ValueValidators: {
            type: "array",
            items: {
              type: "string"
            },
            minItems: 1
          }
        },
        dependentRequired: {
          Validators: [
            "ValueValidators"
          ]
        },
        required: [
          "Name",
          "DisplayName",
          "Type"
        ],
        additionalProperties: false
      },
      minItems: 1,
      uniqueItems: true
    }
  },
  required: [
    "Name",
    "PluralName",
    "Fields"
  ],
  additionalProperties: false
}
