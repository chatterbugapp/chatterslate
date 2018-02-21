export default {
  object: 'block',
  type: 'table',
  data: {
    className: 'table_conversation',
  },
  nodes: [
    {
      object: 'block',
      type: 'table_row',
      nodes: [
        {
          object: 'block',
          type: 'table_cell',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'Icon',
                },
              ],
            },
          ],
        },
        {
          object: 'block',
          type: 'table_cell',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'Teacher Text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      object: 'block',
      type: 'table_row',
      nodes: [
        {
          object: 'block',
          type: 'table_cell',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'Icon',
                },
              ],
            },
          ],
        },
        {
          object: 'block',
          type: 'table_cell',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'Student Text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
