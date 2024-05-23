import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constant";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);

  function loginSubmit() {
    console.log(username, password);

    const userData = {
      username: username,
      password: password,
    };

    axios
      .post("/login-user", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("userType", res.data.userType);
          // Reset input fields and error message
          setUsername("");
          setPassword("");
          setError("");
          if (res.data.userType === "admin") {
            navigation.navigate("Admin");
          } else if (res.data.userType === "user") {
            navigation.navigate("Home");
          }
        } else {
          setError("Invalid Credentials");
        }
      })
      .catch((error) => {
        setError("Invalid Credentials");
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary2 }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 50,
              color: COLORS.black,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Kopi Automation ☕
          </Text>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {""}

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Username
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Remember Me</Text>
        </View>

        <Button
          onPress={loginSubmit}
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              height: 350,
              width: 350,
              opacity: 0.6,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  errorText: {
    color: "white",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "red",
    padding: 20,
    marginHorizontal: 50,
  },
});
export default Login;
