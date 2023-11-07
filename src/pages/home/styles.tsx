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

const newsStyle = StyleSheet.create({
  container: {
    padding: 8,
  },
  containerButton: { flexDirection: "row", justifyContent: "center" },
  button: {
    marginHorizontal: 4,
  },
  elements: { marginTop: "20%", backgroundColor: "##313D5A", padding: 8 },
  favButton: {
    height: "80%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
   
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },

  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  closeButton: {
    padding: 10,
    top: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default newsStyle;
