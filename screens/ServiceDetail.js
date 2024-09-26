import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../apis/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ServiceDetail = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});

export default ServiceDetail;
