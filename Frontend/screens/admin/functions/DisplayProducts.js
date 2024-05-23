import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker"
import axios from "axios";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
  const [editedProductQuantity, setEditedProductQuantity] = useState("");
  const [editedProductCategory, setEditedProductCategory] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get("/getproducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Product Name: {item.prodname}</Text>
      <Text style={styles.itemPrice}>Price: {item.price}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemCategory}>Category: {item.category}</Text>
      <TouchableOpacity onPress={() => handleEdit(item)}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemove(item)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setEditedProductName(item.prodname);
    setEditedProductPrice(item.price);
    setEditedProductQuantity(item.quantity);
    setEditedProductCategory(item.category);
    setEditModalVisible(true);
  };
  const handleRemove = async (item) => {
    console.log("Removing product with ID:", item._id);
    try {
      await axios.delete(
        `/removeproduct/${item._id}`
      );
      getProducts();
    } catch (error) {
      console.error("Error removing product:", error.message);
    }
  };
  const saveChanges = async () => {
    try {
      await axios.put(
        `http://192.168.1.8:5000/editproduct/${selectedProduct._id}`,
        {
          prodname: editedProductName,
          price: editedProductPrice,
          quantity: editedProductQuantity,
          category: editedProductCategory,
        }
      );
      setEditModalVisible(false);
      getProducts();
    } catch (error) {
      console.error("Error editing product:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={editedProductName}
            onChangeText={(text) => setEditedProductName(text)}
            placeholder="Product Name"
          />
          <TextInput
            style={styles.input}
            value={editedProductPrice.toString()}
            onChangeText={(text) => setEditedProductPrice(text)}
            placeholder="Price"
          />
          <TextInput
            style={styles.input}
            value={editedProductQuantity.toString()}
            onChangeText={(text) => setEditedProductQuantity(text)}
            placeholder="Quantity"
          />
          <Picker
            style={styles.input}
            selectedValue={editedProductCategory}
            onValueChange={(itemValue, itemIndex) =>
              setEditedProductCategory(itemValue)
            }
          >
            <Picker.Item label="Beverages" value="Beverages" />
            <Picker.Item label="Meals" value="Meals" />
            <Picker.Item label="Snacks" value="Snacks" />
          </Picker>
          <TouchableOpacity onPress={saveChanges}>
            <Text style={styles.saveButton}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
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
  editButton: {
    color: "blue",
    marginBottom: 5,
  },
  removeButton: {
    color: "red",
  },
  modalContainer: {
    backgroundColor: "#fff",
    marginVertical: 350,
    marginHorizontal: 25,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    borderColor: "#333",
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default ProductListScreen;
