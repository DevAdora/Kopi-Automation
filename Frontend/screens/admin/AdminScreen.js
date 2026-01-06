import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";
import { FontAwesome5 } from "@expo/vector-icons";

function AdminScreen({ navigation }) {
  const [userData, setUserData] = useState("");
  const [allUserData, setAllUserData] = useState("");

  const total = 15000;
  const categorySales = [
    { category: "Meals", sales: 5000 },
    { category: "Beverages", sales: 4000 },
    { category: "Snacks", sales: 6000 },
  ];
  const mealsSales = 5000;
  const beveragesSales = 4000;
  const snacksSales = 6000;

  async function getAllData() {
    axios.get("/get-all-user").then((res) => {
      setAllUserData(res.data.data);
    });
  }

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios.post("/userdata", { token: token }).then((res) => {
      setUserData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  function signOut() {
    AsyncStorage.setItem("isLoggedIn", "");
    AsyncStorage.setItem("token", "");
    AsyncStorage.setItem("userType", "");
    navigation.navigate("Login");
  }

  function deleteUser(data) {
    axios.post("/delete-user", { id: data._id }).then((res) => {
      if (res.data.status == "Ok") {
        Alert.alert("User deleted");
        getAllData();
      }
    });
  }

  const UserCard = ({ data }) => (
    <View style={styles.card}>
      <View style={styles.cardDetails}>
        <Text style={styles.username}>{data.username}</Text>
        <Text style={styles.email}>{data.email}</Text>
        <Text style={styles.userType}>{data.userType}</Text>
      </View>

      <View>
        <Icon
          name="delete"
          size={30}
          color="black"
          onPress={() => deleteUser(data)}
        />
      </View>
    </View>
  );
  const StaticSalesGraph = () => {
    const salesData = [
      { day: "Mon", amount: 150 },
      { day: "Tue", amount: 200 },
      { day: "Wed", amount: 180 },
      { day: "Thu", amount: 220 },
      { day: "Fri", amount: 250 },
      { day: "Sat", amount: 300 },
      { day: "Sun", amount: 280 },
    ];
    const data = salesData.map((item) => item.amount);
    const labels = salesData.map((item) => item.day);

    return { data, labels };
  };

  const salesData = [{ day: "Today", totalSales: 150 }];

  const totalSales = salesData.reduce((acc, curr) => acc + curr.totalSales, 0);
  function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.userInfoContent}>
          <FontAwesome5
            name="user"
            size={24}
            color="#000"
            onPress={() => navigation.navigate("Inventory")}
            style={styles.navIcon}
          />
          <Text style={styles.userName}>{capitalizeFirstLetter(userData.username)}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>TOTAL SALES</Text>
        <View style={styles.salesContainer}>
          {salesData.map((item, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.timeText}>(As of Monday 3:59PM)</Text>
              <Text style={styles.salesText}>₱{item.totalSales}</Text>
            </View>
          ))}
          <Text style={styles.totalSalesText}>Total Sales: ₱{totalSales}</Text>
        </View>
      </View>
      <View style={styles.chartcontainer}>
        <LineChart
          style={{ flex: 1 }}
          data={StaticSalesGraph().data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
          gridMin={0}
        />
        <View style={styles.labelsContainer}>
          {StaticSalesGraph().labels.map((day, index) => (
            <Text key={index} style={styles.labelText}>
              {day}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.bentocontainer}>
        <View style={styles.totalSalesBox}>
          <Text style={styles.boxTitle}>TOTAL SALES</Text>
          <Text style={styles.totalText}>₱{total}</Text>
        </View>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesRow}>
            <View style={styles.categoryBox}>
              <Text style={styles.boxTitle}>Meals</Text>
              <Text style={styles.categorySalesText}>₱{mealsSales}</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.boxTitle}>Beverages</Text>
              <Text style={styles.categorySalesText}>₱{beveragesSales}</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.boxTitle}>Snacks</Text>
              <Text style={styles.categorySalesText}>₱{snacksSales}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* <FlatList
        data={allUserData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserCard data={item} />}
      /> */}
      <View style={styles.navBar}>
        <View style={styles.navItem}>
          <FontAwesome5
            name="home"
            size={24}
            color="#5E3023"
            onPress={() => navigation.navigate("Admin")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </View>

        <View style={styles.navItem}>
          <FontAwesome5
            name="user"
            size={24}
            color="#5E3023"
            onPress={() => navigation.navigate("Profile")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Profile</Text>
        </View>

        <View style={styles.navItem}>
          <FontAwesome5
            name="clipboard-list"
            size={24}
            color="#5E3023"
            onPress={() => navigation.navigate("Inventory")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Products</Text>
        </View>

        <View style={styles.navItem}>
          <FontAwesome5
            name="sign-out-alt"
            size={24}
            color="#5E3023"
            onPress={signOut}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Log out</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: "#F3E9DC",
  },
  userInfo: {
    marginBottom: 20,
  },
  userInfoContent: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderBottomStyle: "solid",
    alignItems: "center",
  },
  navIcon: {
    marginRight: 10,
  },
  chartcontainer: {
    marginVertical: 10,
    flex: 1,
    padding: 20,
    borderWidth: 1,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  labelText: {
    fontSize: 14,
    color: "#777777",
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  userType: {
    fontSize: 18,
    color: "#777777",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDetails: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    // fontWeight: "bold",
    // color: "#5E3023",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#777777",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    paddingBottom: 10,
    textAlign: "center",
  },
  salesContainer: {
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    // borderRadius: 20,
  },
  dayText: {
    fontSize: 30,
    paddingVertical: 5,
  },
  timeText: {
    paddingBottom: 10,
  },
  salesText: {
    fontSize: 25,
    paddingVertical: 5,
    fontWeight: "400",
  },
  totalSalesText: {
    fontSize: 25,
    paddingVertical: 5,
    fontWeight: "400",
  },
  // BENTO //
  bentocontainer: {
    // flex: 1,
    // backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  totalSalesBox: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  categoriesContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryBox: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginHorizontal: 5,
  },
  categorySalesText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "blue",
  },
  // NAVBAR //
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    alignItems: "flex-end",
    borderTopColor: "#ccc",
  },
  navIcon: {
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    textAlign: "center",
  },
});
export default AdminScreen;
