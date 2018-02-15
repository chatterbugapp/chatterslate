import React from 'react'
import PropTypes from 'prop-types'

// via https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch (error, info) {
    this.setState({ error })
    if (this.props.handleError) {
      this.props.handleError.call(error, info)
    }
  }

  render () {
    if (this.state.error) {
      const message = "Oops! The editor had an error. Please refresh the page. Your changes will be kept, don't panic!"
      return (
        <div className="editor__error">
          <p>{message}</p>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  handleError: PropTypes.func,
  children: PropTypes.node,
}

export default ErrorBoundary
