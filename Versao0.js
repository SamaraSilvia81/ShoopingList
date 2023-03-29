import { useState } from 'react';
import { create } from 'zustand'
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const useCounterProducts = create((set) => ({
  products: 0,
  setProducts: (newValue) => set({products: newValue}),
  increaseProduct: () => set((state) => ({ products: state.products + 1 })),
  decrementProduct: () => set((state) => ({ products: state.products - 1 })),
  removeAllProduct: () => set({ products: 0 }),
}))

const Item = ({title,push,minus,clean,products}) => (
  <View style={styles.item}>
    <Text style={styles.result}>{title} : {products}</Text>
    <View style={styles.btn}>
      <View style={styles.push}>
        <Button mode="contained" onPress={push}>+</Button>
      </View>
      <View style={styles.clean}>
        <Button mode="contained" onPress={clean}>Clean</Button>
      </View>
      <View style={styles.minus}>
        <Button mode="contained" onPress={minus}>-</Button>
      </View>
    </View>
  </View>
);

export default function App() {

  const [inputValue, setInputValue] = useState('');
  const [fruits, setFruits] = useState('');
  const { products,setProducts, increaseProduct, decrementProduct,removeAllProduct } = useCounterProducts();

  function add () {
    setFruits(inputValue);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => value.length ? setInputValue(value) : setInputValue('')}
          mode="flat"
          value={inputValue}
          keyboardType={'text'}
          textAlign={'center'}
        />
        <Button mode="contained" onPress={() => add()}>ADD</Button>
      </View>
      <FlatList
        data={inputValue}
        renderItem={({item}) => 
        <Item 
          title={item.title} 
          push={item.push} 
          clean={item.clean} 
          minus={item.minus} 
        />}
        keyExtractor={item => item.id}
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
  btn: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  clean: {
    marginRight: 5,
    marginLeft: 5,
  },
  result: {
    textAlign: 'center',
    marginBottom: 10,
  },
});