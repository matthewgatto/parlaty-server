import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './index.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("ERROR", error);
    console.log("INFO", info);
  }
  reload = () => {
    this.props.history.push('/')
    this.setState({hasError: false})

  }
  render() {
    if (this.state.hasError) {
      return(
        <div className={styles.container}>
          <div className={styles.text}>An Unexpected Error Has Occurred</div>
          <button className={styles.button} onClick={this.reload}>Home</button>
        </div>
      )
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
