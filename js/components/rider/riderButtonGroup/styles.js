import { StyleSheet } from 'react-native';

const styles: any = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameLabel: {
    marginTop: 10,
    alignSelf: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRider: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(254, 249, 176, 0.8)',
    borderRadius: 50
  },
  checkmark: {
    fontSize: 50,
    alignSelf: 'center',
    marginTop: 3
  },
});
export default styles;
