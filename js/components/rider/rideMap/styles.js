import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const styles: any = StyleSheet.create({
  iosHeader: {
    backgroundColor: '#fff',
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
  },
  iosHeaderTitle: {
    width: 200,
    fontSize: 18,
    fontWeight: '500',
    color: commonColor.brandPrimary,
  },
  aHeaderTitle: {
    width: 200,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  carIcon: {
    fontSize: 24,
  },
  pickupPinIcon: {
    fontSize: 24,
    color: 'green'
  },
  dropoffPinIcon: {
    fontSize: 24,
    color: 'orange'
  },
  ridePending: {
    backgroundColor: 'grey',
  },
});
export default styles;
