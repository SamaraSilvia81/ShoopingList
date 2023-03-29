import React, { useState } from 'react';
import { create } from 'zustand';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const useShoppingList = create((set) => ({
  items: [],
  addItem: (title, quantity) => set((state) => ({
    items: [...state.items, { id: Date.now(), title, quantity }],
  })),
  incrementItem: (id) => set((state) => ({
    items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item),
  })),
  decrementItem: (id) => set((state) => ({
    items: state.items.map((item) => item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item),
  })),
   cleanItem: (id) => set((state) => ({
    items: state.items.map((item) => item.id === id ? { ...item, quantity: 0 } : item),
  })),
  removeAllItems: () => set({ items: [] }),
}));

const Item = ({ item, incrementItem, decrementItem, removeAllItems, cleanItem }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <View style={styles.quantity}>
      <Button mode="contained" onPress={() => incrementItem(item.id)}>+</Button>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <Button mode="contained" onPress={() => decrementItem(item.id)}>-</Button>
      <Button mode="contained" onPress={() => cleanItem(item.id)}>Clean</Button>
    </View>
    <Button mode="contained" onPress={removeAllItems} style={styles.removeButton}>Remover</Button>
  </View>
);

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const { items, addItem, incrementItem, decrementItem, cleanItem, removeAllItems } = useShoppingList();

  const handleAddItem = () => {
    if (inputValue.trim().length > 0) {
      addItem(inputValue.trim(), 1);
      setInputValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          mode="flat"
          value={inputValue}
          keyboardType={'text'}
          textAlign={'center'}
        />
        <Button mode="contained" onPress={handleAddItem}>
          Adicionar
        </Button>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} incrementItem={incrementItem} decrementItem={decrementItem} removeAllItems={removeAllItems} cleanItem={cleanItem} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom: 20,
  },
  input: {
    margin: 5,
    padding: '1px 3px',
    height: 40,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
  }
});