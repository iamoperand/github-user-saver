import React, { Component } from 'react';
import {
  Row,
  Button,
  Icon,
} from 'antd';
import PropTypes from 'prop-types';


import routes from '../../config/routes';


class Home extends Component {
  letsSave = () => {
    const { history } = this.props;
    history.push(routes.SearchUser);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '1em 0' }}>
        <Row>
          <h1>GitHub User Saver</h1>
        </Row>

        <Row style={{ margin: '3em 0' }}>
          <h2>&ldquo;Let&apos;s save yourself (in Firebase)&rdquo;</h2>
        </Row>


        <Row style={{ marginTop: '5em' }}>
          <Row>
            <h3>Are you ready?</h3>
          </Row>
          <Row>
            <Button type="primary" onClick={this.letsSave}>
              Let&apos;s Save<Icon type="right" />
            </Button>
          </Row>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default Home;
