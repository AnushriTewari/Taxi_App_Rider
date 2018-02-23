import React, { Component } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import {
  Header,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
} from 'native-base';

import styles from './style';
import commonColor from '../../../../native-base-theme/variables/commonColor';

class NavigationBar extends Component {
  renderLeftButton() {
    const {
      onLeftButtonPress,
      back = false,
      leftButtonIconName,
      leftButtonText,
    } = this.props;

    if (onLeftButtonPress) {
      if (back || leftButtonIconName) {
        return (
          <Button transparent onPress={onLeftButtonPress}>
            <Icon
              name={back ? 'md-arrow-back' : leftButtonIconName}
              style={styles.icon}
            />
          </Button>
        );
      }
      if (leftButtonText) {
        return (
          <TouchableOpacity onPress={onLeftButtonPress}>
            <Text style={styles.buttonText}>{leftButtonText}</Text>
          </TouchableOpacity>
        );
      }
    }

    return null;
  }

  renderTitle() {
    return (
      <Title
        style={
          Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle
        }
      >
        {this.props.title}
      </Title>
    );
  }

  renderRightButton() {
    const {
      onRightButtonPress,
      rightButtonIconName,
      rightButtonText,
      rightButtonRenderer,
    } = this.props;

    if (onRightButtonPress) {
      if (rightButtonRenderer) {
        return rightButtonRenderer();
      }
      if (rightButtonIconName) {
        return (
          <Button transparent onPress={onRightButtonPress}>
            <Icon name={rightButtonIconName} style={styles.icon} />
          </Button>
        );
      }
      if (rightButtonText) {
        return (
          <TouchableOpacity onPress={onRightButtonPress}>
            <Text style={styles.buttonText}>{rightButtonText}</Text>
          </TouchableOpacity>
        );
      }
    }

    return null;
  }
  render() {
    return (
      <Header
        hasTabs={this.props.hasTabs}
        androidStatusBarColor={commonColor.statusBarLight}
        style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
      >
        <Left>{this.renderLeftButton()}</Left>
        <Body>{this.renderTitle()}</Body>
        <Right>{this.renderRightButton()}</Right>
      </Header>
    );
  }
}

export default NavigationBar;
