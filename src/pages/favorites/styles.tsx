
import { StyleSheet, Platform } from "react-native";

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  android: {
    elevation: 5,
  },
});

const favoriteStyles = StyleSheet.create({
  container: {
    padding: 8,
  },
  containerButton: { flexDirection: "row", justifyContent: "center" },
  button: {
    marginHorizontal: 4,
  },
  elements: { marginTop: "20%", backgroundColor: "##313D5A", padding: 8 },


});
export default favoriteStyles;
