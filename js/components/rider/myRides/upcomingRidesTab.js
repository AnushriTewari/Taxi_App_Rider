import React, { Component } from 'react';

import {
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from 'native-base';

const rides = [
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
  {
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    riders: [],
  },
];

export interface Props {
  navigation: any;
  list: any;
}
export interface State {}

export default class UpcomingRidesTab extends Component<Props, State> {
  render() {
    return (
      <List
        dataArray={rides}
        renderRow={data => (
          <ListItem
            style={{ marginLeft: -10 }}
            button
            onPress={() => this.props.onPress(data.id)}
          >
            <Left style={{ flexDirection: 'column', flexGrow: 1 }}>
              <Text note>TUE</Text>
              <Text>24</Text>
              <Text note>DEC</Text>
            </Left>
            <Body style={{ flexGrow: 3 }}>
              <Text>Allison and Jack</Text>
              <Text note>Home</Text>
              <Text note>School</Text>
            </Body>
            <Right style={{ flexGrow: 1 }}>
              <Text note>7:45 AM</Text>
            </Right>
          </ListItem>
        )}
      />
    );
  }
}
