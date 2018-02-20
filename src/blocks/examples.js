export default {
  kind: 'block',
  type: 'examples_block',
  nodes: [
    {
      kind: 'block',
      type: 'examples_header',
      nodes: [
        {
          kind: 'text',
          leaves: [
            {
              text: 'This is a large example to teach something.',
            },
          ],
        }
      ]
    },
    {
      kind: 'block',
      type: 'examples_subheader',
      nodes: [
        {
          kind: 'text',
          leaves: [
            {
              text: 'Here is a smaller blurb to describe what you just taught!',
            },
          ],
        }
      ]
    },
  ],
}
