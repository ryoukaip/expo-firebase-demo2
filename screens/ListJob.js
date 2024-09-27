import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../apis/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const ListJob = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort the userList alphabetically by name
      userList.sort((a, b) => a.name.localeCompare(b.name));

      setUsers(userList);
    } catch (e) {
      console.error("Error fetching users: ", e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers(); // Fetch users when screen is focused
    }, [])
  );

  const renderUser = ({ item }) => (
    <View style={styles.containerInner}>
      <View style={styles.textContainer}>
        <Text style={styles.normalText}>{item.name}</Text>
        <Text style={styles.priceText}>{item.price}đ</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UpdateService", { user: item })}
        >
          <Text style={styles.textIcon}>&#x270D;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("DeleteJob", { serviceId: item.id })
          }
        >
          <Text >&#x274C;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ServiceDetail", { serviceId: item.id })
          }
        >
          <Text style={styles.textIcon}>ⓘ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const toAddUser = () => {
    navigation.navigate("AddJob");
    // alert("Not implemented!")
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ padding: 10, height: 100, alignSelf: "center" }}
        source={require("../assets/spa.png")}
      />
      <Pressable style={styles.buttonAdd} onPress={toAddUser}>
        <Text style={styles.buttonText}> Add Service</Text>
      </Pressable>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  containerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    margin: 10,
    height: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "pink",
    marginLeft: 5,
    borderRadius: 4,
  },
  buttonAdd: {
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
    color: "black",
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
  addUserButton: {
    alignItems: "flex-end",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textIcon:{
    fontSize: 30
  }
});

export default ListJob;
