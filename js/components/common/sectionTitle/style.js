//import commonColor from '../../../../native-base-theme/variables/commonColor';

const React = require('react-native');

const { Platform } = React;

export default {
  text: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: Platform.OS === 'ios' ? 15 : 22,
  },
};
