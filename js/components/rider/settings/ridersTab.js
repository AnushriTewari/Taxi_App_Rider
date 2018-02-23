/* @flow */

import React, { Component } from 'react';

import { Text, List, ListItem, Thumbnail } from 'native-base';

export interface Rider {
  id: ?number;
  name: string;
  imageUri: string;
}

export interface Props {
  riders: Array<Rider>;
  onSelect(Rider): string;
}
export interface State {}


const addRider: Rider = {
  id: undefined,
  name: 'Add Rider',
  imageUri: 'https://image.flaticon.com/icons/png/512/181/181546.png',
};

export default class UpcomingRidesTab extends Component<Props, State> {
  render() {
    const riders: Array<Rider> = [addRider].concat(this.props.riders);

    return (
      <List
        dataArray={riders}
        renderRow={(data: Rider) => (
          <ListItem
            button
            onPress={() => this.props.onSelect(data)}
          >
            <Thumbnail source={{ uri: data.imageUri }} />
            <Text style={{ marginLeft: 10 }}>{data.name}</Text>
          </ListItem>
        )}
      />
    );
  }
}

