import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.10:5000/getorders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style = {styles.container}>
      <Text style = { styles.titleText}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemOrder}>Order ID: {item._id}</Text>
            <Text style={styles.itemName}>
              Product Names: {item.productNames.join(", ")}
            </Text>
            <Text style={styles.itemQuantity}>
              Quantities: {item.quantities.join(", ")}
            </Text>
            <Text style={styles.itemPrice}>
              Total Amount: ₱{item.amount.toFixed(2)}
            </Text>
            <Text style> Payment Method: {item.payment}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 24,

    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  itemOrder: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,

    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 3,
  },
  itemQuantity: {
    fontSize: 16,
    marginBottom: 3,
  },
  itemCategory: {
    fontSize: 16,
  },
});

export default OrdersScreen;
