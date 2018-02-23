import React, { Component } from 'react';
import { Content, Card, CardItem, Text, Body } from 'native-base';

export default class CompletedRidesTab extends Component {
  render() {
    return (
      <Content padder>
        <Card>
          <CardItem>
            <Body>
              <Text>When you complete a ride, it will show up here</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
