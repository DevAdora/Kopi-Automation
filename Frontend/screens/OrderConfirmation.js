import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from "react-native";

const OrderConfirmationScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        navigation.navigate("Home");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible, navigation]);

  const handlePlaceOrder = () => {
    // Perform actions related to placing the order
    // For now, let's just show the modal
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/check.png")}
        style={styles.checkIcon}
      />
      <Text style={styles.text}>Order Placed Successfully!</Text>
      <Text style={styles.text}>Thank you for your order.</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Your order has been placed successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#5E3023",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "FFFFFF",
    fontSize: 16,
  },
});

export default OrderConfirmationScreen;
