import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddProductScreen() {
  const [prodname, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setSelectedCategory] = useState("Meals");
  const [image, setImage] = useState("");

  const handleAddProduct = () => {
    fetch("http://192.168.1.8:5000/addproducts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prodname: prodname,
        price: price,
        quantity: quantity,
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Success", "Product added successfully");
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={prodname}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <View style={styles.pickercontainer}>
        <Text style={styles.label}>Select Category:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Meals" value="Meals" />
          <Picker.Item label="Beverages" value="Beverages" />
          <Picker.Item label="Snacks" value="Snacks" />
        </Picker>
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Text style={styles.addButtonText}>Pick an image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pick: {
    backgroundColor: '#5E3023'
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3E9DC",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  uploadText: {
    marginLeft: 10,
    color: "#007bff",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#5E3023",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  avatar: {
    borderRadius: 80,
    marginTop: 50,
    backgroundColor: "white",
    height: 160,
    width: 160,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddProductScreen;
