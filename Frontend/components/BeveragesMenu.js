import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import placeholderImage from "../assets/images/Beverages/americano.png";
import COLORS from "../constant";
import { useCart } from "./CartContext";
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = ({ item }) => {
  const [beveragesProducts, setBeveragesProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getBeveragesProducts();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item, item.quantity);
  };

  const getBeveragesProducts = async () => {
    try {
      const response = await axios.get("/getproducts");
      const beverages = response.data.filter(
        (product) => product.category === "Beverages"
      );
      const beveragesWithDefaultQuantity = beverages.map((product) => ({
        ...product,
        quantity: 1,
        maxQuantity: product.quantity,
      }));
      setBeveragesProducts(beveragesWithDefaultQuantity);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleIncrement = (index) => {
    setBeveragesProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      if (newProducts[index].quantity < newProducts[index].maxQuantity) {
        newProducts[index].quantity += 1;
      }
      return newProducts;
    });
  };

  const handleDecrement = (index) => {
    setBeveragesProducts((prevProducts) => {
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
        <Text style={styles.price}>₱{item.price}</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDecrement(index)}
        >
          <Icon.Minus strokeWidth={2} height={20} width={20} stroke={"white"} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleIncrement(index)}
        >
          <Icon.Plus strokeWidth={2} height={20} width={20} stroke={"white"} />
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
      data={beveragesProducts}
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "space-between",
    // padding: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    marginHorizontal: 10,
    flex: 1
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
    // marginLeft: 13,
    width: 50,
  },
  button: {
    backgroundColor: "#5E3023",
    borderRadius: 10,
    padding: 8,
    // marginLeft: 10,
  },
  quantity: {
    fontSize: 16,
    // marginLeft: 10,
    // marginRight: 10,
  },
  add: {
    fontSize: 12,
    padding: 2,
    color: "#fdfdfd",
  },
});

export default Menu;
