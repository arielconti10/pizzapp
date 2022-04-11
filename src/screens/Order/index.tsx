import React from 'react';
import { Platform } from 'react-native';
import { Container, Header, Photo } from './styles';
import { ButtonBack } from '@components/ButtonBack';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>
      <Photo source={{uri: 'https://github.com/arielconti10.png'}} />
    </Container>
  )
}