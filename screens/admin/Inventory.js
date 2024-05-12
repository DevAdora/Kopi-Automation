import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const InventoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <FontAwesome5 name="plus" size={30} color="#fff" />
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DisplayProducts')}
      >
        <FontAwesome5 name="list" size={30} color="#fff" />
        <Text style={styles.buttonText}>View Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DisplayOrders')}
      >
        <FontAwesome5 name="trash-alt" size={30} color="#fff" />
        <Text style={styles.buttonText}>Order Logs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 100,
    width: 250
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center', // Center the text horizontally
    marginLeft: 10, // Add some space between the icon and text
  },
});

export default InventoryScreen;
