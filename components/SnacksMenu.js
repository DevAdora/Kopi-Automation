import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { menus } from "../constant";
import COLORS from "../constant";
import * as Icon from "react-native-feather";
import axios from "axios";
import { useCart } from "./CartContext";
import placeholderImage from "../assets/images/Beverages/americano.png"; // Import placeholder image

const Menu = ({ item }) => {
  const [snacksProducts, setSnacksProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getSnacksProducts();
  }, []);
  const handleAddToCart = (item) => {
    addToCart(item, item.quantity);
  };
  const getSnacksProducts = async () => {
    try {
      const response = await axios.get("/getproducts");
      const snacks = response.data.filter(
        (product) => product.category === "Snacks"
      );
      const snacksWithDefaultQuantity = snacks.map((product) => ({
        ...product,
        quantity: 1,
        maxQuantity: product.quantity,
      }));
      setSnacksProducts(snacksWithDefaultQuantity);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  const handleIncrement = (index) => {
    setSnacksProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      if (newProducts[index].quantity < newProducts[index].maxQuantity) {
        newProducts[index].quantity += 1;
      }
      return newProducts;
    });
  };

  const handleDecrement = (index) => {
    setSnacksProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      if (newProducts[index].quantity > 1) {
        newProducts[index].quantity -= 1;
      }
      return newProducts;
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.avatarContainer}>
          <Image
            source={item.image ? { uri: item.image } : placeholderImage}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{item.prodname}</Text>
        <Text style={styles.price}>₱{item.price?.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleIncrement(index)}
        >
          <Icon.Plus strokeWidth={2} height={20} width={20} stroke={"white"} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDecrement(index)}
        >
          <Icon.Minus strokeWidth={2} height={20} width={20} stroke={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.add}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <FlatList
      data={snacksProducts}
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "space-between",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
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
  button: {
    backgroundColor: "#5E3023",
    borderRadius: 10,
    padding: 8,
    marginLeft: 10,
  },
  quantity: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  add: {
    fontSize: 16,
    color: "#fdfdfd",
  },
});

export default Menu;
