import commonColor from '../../../../native-base-theme/variables/commonColor';

export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  profileIcon: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 50,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: commonColor.inputColorPlaceholder,
  },
  pickerLabel: {
    flex: 1,
    alignSelf: 'flex-start',
    color: '#575757',
    fontSize: 17,
    paddingRight: 5,
    paddingTop: 5,
    top: 5,
  },
  inputContainer: {
    borderWidth: null,
    paddingBottom: 0,
    paddingTop: 0,
    margin: null,
  },
  input: {
    paddingBottom: 0,
    flex: 2,
  },
  pickerField: {
    marginLeft: 10,
  },
  blueBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEFEF',
    paddingBottom: 0,
    backgroundColor: '#f8f8f8',
  },
  blueHeader: {
    color: commonColor.lightThemePlaceholder,
    padding: 5,
    fontWeight: 'bold',
  },
};
