import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/categories";
import COLORS, { categories } from "../constant";
import Menu from "../components/menu";
import Cart from "../components/cart";
import BeveragesMenu from "../components/BeveragesMenu";
import SnacksMenu from "../components/SnacksMenu";
import MealsMenu from "../components/MealsMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Meals");
  const [products, setProducts] = useState([]);
  const [sliderOpen, setSliderOpen] = useState(false);
  const slideAnimation = useRef(new Animated.Value(-350)).current;

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  function signOut() {
    AsyncStorage.setItem("isLoggedIn", "");
    AsyncStorage.setItem("token", "");
    AsyncStorage.setItem("userType", "");
    navigation.navigate("Login");
  }

  const toggleSlider = () => {
    const toValue = sliderOpen ? -350 : 0;
    Animated.timing(slideAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSliderOpen(!sliderOpen);
  };

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios.post("/userdata", { token: token }).then((res) => {
      setUserData(res.data.data);
    });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryClick(category.name)}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.activeCategoryButton,
            ]}
          >
            <View class="categoryContainer">
              <Image source={category.image} style={styles.categoryImage} />
              <Text
                key={category.id}
                style={[
                  styles.categoryText,
                  selectedCategory === category.name &&
                    styles.activeCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {selectedCategory === "Beverages" && (
        <BeveragesMenu products={products} />
      )}
      {selectedCategory === "Meals" && <MealsMenu products={products} />}
      {selectedCategory === "Snacks" && <SnacksMenu products={products} />}
      
      <Cart zIndex={sliderOpen ? -1 : 1} />
      <TouchableOpacity onPress={toggleSlider} style={styles.toggleButton}>
        <FontAwesome5
          name="user"
          size={24}
          color="#5E3023"
          style={styles.navIcon}
        />
        <Text style={styles.toggleButtonText}>{capitalizeFirstLetter(userData.username)}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.sliderNav,
          { transform: [{ translateX: slideAnimation }] },
        ]}
      >
        <TouchableOpacity onPress={toggleSlider} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sliderNavItem}>
          <FontAwesome5 name="list" size={30} color="#333" />
          <Text style={styles.sliderNavItemText}>Prodcts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sliderNavItem}
          onPress={() => navigation.navigate("DisplayOrders")}
        >
          <FontAwesome5 name="list" size={30} color="#333" />
          <Text style={styles.sliderNavItemText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sliderNavItem} onPress={signOut}>
          <FontAwesome5
            name="sign-out-alt"
            size={24}
            color="#333"
            style={styles.navIcon}
          />
          <Text style={styles.sliderNavItemText}>Log out</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
function capitalizeFirstLetter(string) {
  if (typeof string !== 'string' || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 95,
    marginBottom: 40,
  },
  categoryButton: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  categoryContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 70,
    height: 70,
    resizeMode: "cover",
  },
  categoryText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  activeCategoryText: {
    fontWeight: "800",
    color: "white",
  },
  toggleButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#5E3023",
    paddingHorizontal: 5,
    fontSize: 24,
  },
  sliderNav: {
    position: "absolute",
    top: 0,
    right: -350,
    bottom: 0,
    width: 350,
    backgroundColor: "#fdfdfd",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    zIndex: 2,
  },
  sliderNavItem: {
    paddingVertical: 10,
    marginTop: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#5E3023",
    flexDirection: 'row', alignItems: 'center',
  },
  sliderNavItemText: {
    color: "#333",
    fontSize: 24,
    marginHorizontal: 10
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 5,
    zIndex: 3,
  },
  closeButtonText: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#333",
    fontSize: 50,
  },
});
