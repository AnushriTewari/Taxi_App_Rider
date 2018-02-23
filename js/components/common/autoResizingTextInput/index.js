import React, { Component } from 'react';
import { Input } from 'native-base';

export default class AutoResizingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  focus() {
    this.textInput && this.textInput.focus();
  }

  render() {
    return (
      <Input
        {...this.props}
        ref={view => (this.textInput = view)}
        multiline
        onContentSizeChange={event => {
          if (event && event.nativeEvent && event.nativeEvent.contentSize) {
            this.setState({
              height: event.nativeEvent.contentSize.height,
            });
          }
          this.props.onContentSizeChange &&
            this.props.onContentSizeChange(event);
        }}
        style={[this.props.style, { height: Math.max(35, this.state.height) }]}
      />
    );
  }
}
