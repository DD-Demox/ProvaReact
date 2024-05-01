import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';

export default function App() {
  const [text,setText] = useState('')
  const [filmes,setFilmes] = useState([])
  const [loaded,setLoaded] = useState(false)
  const [genero,setGenero] = useState('')
  const [filmesGenero,setFilmesGenero]= useState([])
  
  const pegaFilme = async () =>{
    await axios.get('http://172.29.16.1:12345/filmes')
    .then(json=>{
      
      setFilmes(json.data)
      // console.log(json.data)
    }).catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setLoaded(true)
      
    })
  }

  const mostraFilme = async ()=>{
    
    await pegaFilme()
    console.log(filmesGenero)
    filmesGenero.length =0
    filmes.forEach((item)=>{
      if(item.Genre.includes(text)){
        filmesGenero.push(item.Title)
        console.log(item.Title)
      }
    })
    console.log(filmesGenero)
    
    
  }
  
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
      />
      <Button
        title="Buscar"
        onPress={() => mostraFilme()}
      />
      <FlatList
        data={filmesGenero}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width:400,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
