import { useState } from 'react';
import { create } from 'zustand';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const useCounterProducts = create((set) => ({
  products: 0,
  setProducts: (newValue) => set({ products: newValue }),
  increaseProduct: () => set((state) => ({ products: state.products + 1 })),
  decrementProduct: () => set((state) => ({ products: state.products - 1 })),
  removeAllProduct: () => set({ products: 0 }),
}));

const Item = ({fruit, increaseProduct, decrementProduct, removeAllProduct}) => (
  <View style={styles.item}>
    <Text style={styles.result}>{fruit.title} : {fruit.products}</Text>
    <View style={styles.btn}>
      <View style={styles.push}>
        <Button mode="contained" onPress={increaseProduct}>+</Button>
      </View>
      <View style={styles.clean}>
        <Button mode="contained" onPress={removeAllProduct}>Clean</Button>
      </View>
      <View style={styles.minus}>
        <Button mode="contained" onPress={decrementProduct}>-</Button>
      </View>
    </View>
  </View>
);

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [fruits, setFruits] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {products,setProducts, increaseProduct, decrementProduct,removeAllProduct } = useCounterProducts();

  const add = ()  => {
    setIsButtonDisabled(true); // desabilitando botão
    setFruits((prevState) =>
      prevState.concat({
        id: prevState.length + 1,
        title: inputValue.trim().length > 0 ? inputValue : 'Unnamed',
        products: products,
      })
    );
     setInputValue(''); // limpando o valor da caixa de texto após adicionar o item
    setIsButtonDisabled(false); // habilitando o botão novamente após a criação do item
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setInputValue(value)}
          mode="flat"
          value={inputValue}
          keyboardType={'text'}
          textAlign={'center'}
        />
        <Button mode="contained" onPress={add} disabled={isButtonDisabled}>
          ADD
        </Button>
      </View>
      <FlatList data={fruits} renderItem={({ item }) => 
      <Item 
          fruit={item}
          increaseProduct={increaseProduct}
          decrementProduct={decrementProduct}
          removeAllProduct={removeAllProduct}
        />} 
        keyExtractor={(item) => item.id.toString()} />
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