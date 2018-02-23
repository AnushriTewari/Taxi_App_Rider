import commonColor from '../../../../native-base-theme/variables/commonColor';

const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
  iosSearchBar: {
    width: deviceWidth - 20,
    alignSelf: 'center',
    marginTop: 10,
    flex: 1,
    height: 60,
    paddingTop: 12,
    margin: 10,
  },
  aSearchBar: {
    width: deviceWidth - 20,
    alignSelf: 'center',
    marginTop: 10,
    flex: 1,
    height: 60,
    paddingTop: 12,
    margin: 10,
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: commonColor.brandPrimary,
  },
  aHeaderTitle: {
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
  slideSelector: {
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth + 5,
  },

  shareContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  shareOptions: {
    paddingLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  shareType: {
    fontSize: 12,
    color: commonColor.lightThemeColor,
  },
  share: {
    paddingRight: 10,
    padding: 10,
    alignItems: 'flex-end',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: deviceWidth + 5,
  },
  iosHeader: {
    backgroundColor: '#fff',
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  SearchPickText: {
    lineHeight: 18,
    fontSize: 14,
    color: '#B6D7EA',
    marginBottom: -2,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
  },
  setPickupLocation: {
    position: 'absolute',
    bottom: deviceHeight / 2.1,
    left: 0,
    right: 0,
  },
  triangle: {
    position: 'absolute',
    bottom: -15,
    left: 75,
    width: 10,
    height: 15,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: 'white',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
};
