import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../apis/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const DeleteJob = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteJob = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "services", serviceId));
      navigation.navigate('ListJob');
    } catch (e) {
      console.error("Error deleting job: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceDetail = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "services", serviceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setService(docSnap.data());  // Extract and set the document data
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error fetching service details: ", e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleServiceDetail();  // Fetch service details when screen is focused
      console.log(serviceId);  // Log the service ID for debugging
    }, [serviceId])
  );

  return (
    <View>
      <Text style={styles.screenTitle}>Are you sure you want to delete this service?</Text>
      {service ? (
        <View>
          <Text>Creator: {service.creator}</Text>
          <Text>Name: {service.name}</Text>
          <Text>Price: {service.price}</Text>
          <Text>Time: {service.time}</Text>
          <Text>Final Update: {service.finalUpdate}</Text>
        </View>
      ) : (
        <Text>No service data available</Text>
      )}
      <Pressable  onPress={handleDeleteJob} style={styles.button}>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
      {loading && <ActivityIndicator size="large" />}
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
    color: 'black',
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
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "700",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  borderlessButtonText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default DeleteJob;
