import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '@components/Button';
import { ButtonBack } from '@components/ButtonBack';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';

import { 
  Container, 
  Header, 
  Title, 
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  async function handlePickerImage() {  
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      })

      if(!result.cancelled) {
        setImage(result.uri)
      }
    }

  }

  async function handleAdd() {
    if(!name.trim()){
      return Alert.alert("Cadastro", "Preencha o nome do produto");
    }

    if(!description.trim()){
      return Alert.alert("Cadastro", "Preencha a descrição do produto");
    }

    if(!image){
      return Alert.alert("Cadastro", "Selecione uma imagem");
    }

    if(!priceSizeP || !priceSizeM || !priceSizeG){
      return Alert.alert("Cadastro", "Preencha todos os preços");
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />

          <Title>Cadastrar</Title>
          
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>

        </Header>

        <Upload>
          <Photo uri={image} />
          <PickImageButton title="carregar" type="primary" onPress={handlePickerImage}/>
        </Upload>
        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input 
              onChangeText={setName} 
              value={name}
            />
          </InputGroup> 

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 144 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input 
              multiline 
              maxLength={144} 
              style={{ height: 60}} 
              onChangeText={setDescription} 
              value={description}
            />
          </InputGroup> 

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            
            <InputPrice 
              size="P"
              onChangeText={setPriceSizeP} 
              value={priceSizeP}
            />
            
            <InputPrice 
              size="M"
              onChangeText={setPriceSizeM} 
              value={priceSizeM}
            />

            <InputPrice 
              size="G"
              onChangeText={setPriceSizeG} 
              value={priceSizeG}
            />
          </InputGroup>

          <Button 
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  )
}