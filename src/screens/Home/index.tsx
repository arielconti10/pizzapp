import React, { useState, useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

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

import { useAuth } from '@hooks/auth';

export function Home() {
  const { COLORS } = useTheme()
  const [search, setSearch] = useState<string>('');
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const { signOut } = useAuth();
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

  function handleLogout() {
    signOut();
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('');
    }, [])
  )

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji>🤗</GreetingEmoji>
          <GreetingText>Bem vindo, Ariel</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={handleLogout}>
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
        type="primary"
        onPress={handleAdd}
      />

    </Container>
  )
}