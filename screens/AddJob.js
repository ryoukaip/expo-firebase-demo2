import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../apis/firebaseConfig";

const AddJob = ({ navigation }) => {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [time, setTime] = useState("");
  const [finalUpdate, setFinalUpdate] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddJob = async () => {
    setLoading(true);
    setError("");
    try {
      const docRef = await addDoc(collection(db, "services"), {
        name,
        creator,
        finalUpdate: Date().toLocaleString(),
        price,
        time: Date().toLocaleString(),
      });
      console.log("Job added with ID: ", docRef.id);
      navigation.navigate("ListJob");
    } catch (e) {
      setError("Error adding Job: " + e.message);
      console.error("Error adding Job: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Add New Service</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Creator"
        value={creator}
        onChangeText={setCreator}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <Pressable onPress={handleAddJob} style={styles.button}>
        <Text>Add Service</Text>
      </Pressable>
      {loading && <ActivityIndicator size="large" />}
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  borderlessButtonText: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
});

export default AddJob;
