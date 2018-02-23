/* @flow */

import React, { Component } from 'react';
import { ProgressViewIOS } from 'react-native';

export interface Props {
  progress: number;
  color: string;
}

interface State {}

export default class ProgressBarNB extends Component<Props, State> {
  render() {
    return (
      <ProgressViewIOS
        {...this.props}
        progress={this.props.progress ? this.props.progress / 100 : 0.5}
        progressTintColor={this.props.color ? this.props.color : '#FFF'}
        trackTintColor="rgba(255,255,255,0.5)"
      />
    );
  }
}
