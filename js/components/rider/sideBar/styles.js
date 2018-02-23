import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
export default {
  links: {
    paddingTop: 15,
    paddingBottom: 15,
    // paddingLeft: 30,
    marginLeft: 0,
    borderBottomWidth: 2,
    borderBottomColor: commonColor.brandPrimary,
  },
  alinks: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    borderBottomWidth: 2,
    borderBottomColor: commonColor.brandPrimary,
  },
  iosAboutlink: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderTopColor: commonColor.brandPrimary,
    borderBottomColor: 'transparent',
  },
  aAboutlink: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: 'transparent',
  },
  linkText: {
    paddingLeft: 10,
    color: commonColor.inverseTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  logoutContainer: {
    padding: 30,
  },
  logoutbtn: {
    paddingTop: 30,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: commonColor.brandPrimary,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: commonColor.brandPrimary,
  },
  drawerContent: {
    paddingTop: 30,
    backgroundColor: commonColor.brandPrimary,
  },
  Bg: {
    backgroundColor: commonColor.brandPrimary,
    height: deviceHeight - (deviceHeight / 3 - 30),
  },
  adrawerContent: {
    paddingTop: 20,
    backgroundColor: commonColor.brandPrimary,
  },
  aProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginLeft: 15,
    fontSize: 25,
  },
  iosProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 5,
    fontSize: 25,
  },
  aSidebarIcons: {
    marginLeft: 30,
    fontWeight: '600',
    color: commonColor.inverseTextColor,
    fontSize: 25,
    opacity: 0.8,
    width: 25,
  },
  iosSidebarIcons: {
    color: commonColor.inverseTextColor,
    marginLeft: 30,
    fontWeight: '600',
    marginTop: 2,
    fontSize: 25,
    opacity: 0.8,
  },
  profile: {
    backgroundColor: commonColor.brandPrimary,
    paddingTop: 10,
    paddingBottom: 10,
  },
};
