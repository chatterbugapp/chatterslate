export default {
  kind: 'block',
  type: 'table',
  data: {
    className: 'table_conversation',
  },
  nodes: [
    {
      kind: 'block',
      type: 'table_row',
      nodes: [
        {
          kind: 'block',
          type: 'table_cell',
          nodes: [
            {
              kind: 'text',
              leaves: [
                {
                  text: 'Icon',
                },
              ],
            },
          ],
        },
        {
          kind: 'block',
          type: 'table_cell',
          nodes: [
            {
              kind: 'text',
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
      kind: 'block',
      type: 'table_row',
      nodes: [
        {
          kind: 'block',
          type: 'table_cell',
          nodes: [
            {
              kind: 'text',
              leaves: [
                {
                  text: 'Icon',
                },
              ],
            },
          ],
        },
        {
          kind: 'block',
          type: 'table_cell',
          nodes: [
            {
              kind: 'text',
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
