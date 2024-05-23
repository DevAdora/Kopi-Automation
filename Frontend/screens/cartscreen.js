import React, { useState } from "react";
import COLORS from "../constant";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../components/CartContext";
import axios from "axios";
import * as Icon from "react-native-feather";
import placeholderImage from "../assets/images/Beverages/americano.png";
import checkImage from "../assets/images/check.png";

export default function CartScreen() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    reduceQuantity,
    increaseQuantity,
  } = useCart();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      setIsLoading(true);

      const productNames = cartItems.map((item) => item.product.prodname);
      const quantities = cartItems.map((item) => item.quantity);

      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const orderDetails = {
        productNames: productNames,
        quantities: quantities,
        totalAmount: totalAmount,
      };

      const response = await fetch("http://192.168.1.8:5000/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      console.log("Order placed successfully:", response.data);

      setShowConfirmation(true);
    } catch (error) {
      console.error("Error placing order:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReduceQuantity = (productId) => {
    reduceQuantity(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "space-between",
              // padding: 25,
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 13,
              marginHorizontal: 10,
              flex: 1
            }}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={item.image ? { uri: item.image } : placeholderImage}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.name}>{item.product.prodname}</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Text style={styles.price}>
              ₱{(item.product.price * item.quantity)}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => reduceQuantity(item.product)}
            >
              <Icon.Minus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => increaseQuantity(item.product)}
            >
              <Icon.Plus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeFromCart(item.product)}
            >
              <Icon.Trash
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>₱{totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={placeOrder}
          disabled={isLoading || cartItems.length === 0} // Disable button if cart is empty or if order is being placed
        >
          <Text style={styles.placeOrderButtonText}>
            {isLoading ? "Placing Order..." : "Place Order"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={handleCloseConfirmation}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image source={checkImage} style={styles.checkIcon} />
            <Text style={styles.modalText}>Order Placed Successfully!</Text>
            <Text style={styles.modalText}>Thank you for your order.</Text>
            <TouchableOpacity style={styles.printButton}>
              <Text style={styles.modalButtonText}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseConfirmation}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#ccc",
    borderRadius: 100,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 55,
    width: 55,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 13,
    width: 100,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },
  price: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 13,
    width: 50,
  },
  totalSection: {
    backgroundColor: "#5E3023",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  button: {
    backgroundColor: "#5E3023",
    borderRadius: 10,
    padding: 8,
    marginLeft: 10,
  },
  placeOrderButton: {
    backgroundColor: "#F3E9DC",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: "#5E3023",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: 5,
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
  checkIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  printButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});
