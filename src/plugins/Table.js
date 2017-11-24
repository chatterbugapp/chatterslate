// via https://github.com/ianstormtaylor/slate/blob/master/examples/tables/index.js
import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../components/ToolbarButton'

const tableBlock = {
        "kind": "block",
        "type": "table",
        "nodes": [
          {
            "kind": "block",
            "type": "table_row",
            "nodes": [
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": ""
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "Human",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "Dog",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "Cat",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "block",
            "type": "table_row",
            "nodes": [
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "# of Feet",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "2"
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "4"
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "4"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "block",
            "type": "table_row",
            "nodes": [
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "# of Lives",
                        "marks": [
                          {
                            "type": "bold"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "1"
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "1"
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "block",
                "type": "table_cell",
                "nodes": [
                  {
                    "kind": "text",
                    "leaves": [
                      {
                        "text": "9"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }

const tableStrategy = (change, type) =>
  change.insertBlock(tableBlock)

export const TablePlugin = ({ type }) => ({
  renderNode (props) {
    const { attributes, node, children } = props
    switch (node.type) {
      case 'table': return <table className={`table_${type}`} {...attributes}><tbody>{children}</tbody></table>
      case 'table_row': return <tr {...attributes}>{children}</tr>
      case 'table_cell': return <td {...attributes}>{children}</td>
    }
  },
})

export const TableButton = ({
  type, icon, title, value, onChange,
}) => (
  <ToolbarButton
    icon={icon}
    title={title}
    onMouseDown={e => {
      e.preventDefault()
      return onChange(tableStrategy(value.change(), type))
    }}
  />
)

TableButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
