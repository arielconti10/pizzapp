import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

import { 
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductButton,
} from './styles';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const { COLORS } = useTheme()
  const [search, setSearch] = useState<string>('');
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const navigation = useNavigation();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'));
  }

  function handleOpen(id: string) {
    navigation.navigate('product', { id });
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchPizzas('');
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }

  useEffect(() => {
    fetchPizzas('');
  }, [])

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji>🤗</GreetingEmoji>
          <GreetingText>Bem vindo, Ariel</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>
    
      <FlatList 
        data={pizzas} 
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard 
            data={item} 
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      /> 

      <NewProductButton 
        title="Cadastrar Pizza" 
        type="secondary"
        onPress={handleAdd}
      />

    </Container>
  )
}