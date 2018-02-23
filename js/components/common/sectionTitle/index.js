import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './style';

class SectionTitle extends Component {
  render() {
    return (
      <Text style={styles.text}>
        {this.props.children}
      </Text>
    );
  }
}

export default SectionTitle;
