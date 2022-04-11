import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

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

export function Home() {
  const { COLORS } = useTheme()

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
    </Container>
  )
}