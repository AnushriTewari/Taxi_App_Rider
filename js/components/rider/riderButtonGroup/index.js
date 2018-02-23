import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Thumbnail, Text, Icon } from 'native-base';

import styles from './styles';

export default class RiderButtonGroup extends Component<Props, State> {
  renderRider = (rider, index) => {
    const { onItemPress } = this.props;
    const Wrapper = onItemPress ? TouchableOpacity : View;
    const props = onItemPress
      ? {
          onPress: () => {
            this.props.onItemPress(index);
          },
        }
      : {};

    return (
      <Wrapper {...props} key={index}>
        <View style={styles.imageWrapper}>
          <Thumbnail
            source={{
              uri: rider.imageUri,
            }}
          />
          {rider.selected && (
            <View style={styles.selectedRider}>
              <Icon name="checkmark" style={styles.checkmark} />
            </View>
          )}
        </View>
        <Text style={styles.nameLabel}>{rider.fName}</Text>
      </Wrapper>
    );
  };

  render() {
    const { riders = [] } = this.props;
    return (
      <View style={styles.buttonGroup}>{riders.map(this.renderRider)}</View>
    );
  }
}
