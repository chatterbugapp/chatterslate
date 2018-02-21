export default {
  object: 'block',
  type: 'examples_block',
  nodes: [
    {
      object: 'block',
      type: 'heading-one',
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
      object: 'block',
      type: 'heading-two',
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
