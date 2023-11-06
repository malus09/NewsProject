import { StyleSheet, Platform } from "react-native";

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  android: {
    elevation: 5,
  },
});

const detailsStyle = StyleSheet.create({
  container: {
    height: 700,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 8,
  },
  img: {
    width: "95%",
    height: 200,
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  scroll: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    ...shadowStyle,
  },
});
export default detailsStyle;
