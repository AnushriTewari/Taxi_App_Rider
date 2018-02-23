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
    backgroundColor: '#FBFAFA',
  },
  ridePending: {
    paddingVertical: 10,
    textAlign: "center"
  },
  heading: {
      textAlign: "center",
      marginTop: 10
  },
  buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
  },
  nextButton: {
      marginTop: 10
  },
  leftBar: {
    borderLeftWidth: 3,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    position: "relative",
    alignSelf: "stretch",
    borderColor: commonColor.brandPrimary
  },
  dot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: commonColor.brandPrimary,
    left: -31,
    top: 0
  },
  text: {
    fontSize: 13,
    lineHeight: Platform.OS === "ios" ? 15 : 22
  }
});
export default styles;
