import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../apis/firebaseConfig";
import { HomeScreen } from "./HomeScreen";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Alert.alert("Login Success", `Welcome ${user.email}`);
        setLoading(false);
        navigation.navigate("ListUser");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Login Failed", errorMessage);
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image style={{ width: 200, height: 200 }}source={require("../assets/flame.png")}/> */}
        <Text style={styles.screenTitle}>Login</Text>
      </View>

      {/* Wrapping each TextInput inside a View */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {/* <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      /> */}
      <Pressable disabled={loading} onPress={handleLogin} style={styles.button}>
        <Text style={{color: 'white'}}>{loading ? "Logging in..." : "Login"}</Text>
      </Pressable>
      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Signup")}
          style={styles.signupLink}
        >
          Sign Up
        </Text>
      </Text>
      <Text style={styles.signupText}>
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.signupLink}
        >
          Forgot password?
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ef506b",
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    width: "100%", // Ensure the input container takes up full width
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 0, // Prevent the input from expanding infinitely
    minWidth: "100%", // Ensure the TextInput takes up full width
    maxWidth: "100%", // Prevent it from growing beyond the screen width
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: '#ef506b',
    padding: 10,
    borderRadius: 8,
  },
});

export default LoginScreen;
