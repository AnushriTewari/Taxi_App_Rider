import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import variables from '../../../../native-base-theme/variables/platform';
//import commonColor from '../../../../native-base-theme/variables/commonColor';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  ridePending: {
    padding: variables.contentPadding,
  },
  heading: {
    textAlign: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: Platform.OS === 'ios' ? 15 : 22,
  },
  paymentTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: Platform.OS === 'ios' ? 15 : 22,
    marginTop: 20,
  },
  text: {
    fontSize: 13,
    lineHeight: Platform.OS === 'ios' ? 15 : 22,
  },
});
export default styles;
