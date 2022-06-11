import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {baseUrl} from '../../helpers/API';

const DetailPokemon = ({navigation, route}) => {
  const {pokeName} = route.params;
  const [dataPokemon, setDataPokemon] = useState({
    name: '',
    photo: 'belum',
    height: '',
    weight: '',
    species: '',
    type: [{name: ''}],
    ability: [{name: ''}],
  });

  useEffect(() => {
    getDataPoke();
  }, []);

  const handleDataPokemon = (field, value) => {
    setDataPokemon(prevState => {
      prevState[field] = value;
      return {
        ...prevState,
      };
    });
  };

  const getDataPoke = async () => {
    try {
      const res = await axios.get(`${baseUrl}/pokemon/${pokeName}`);
      console.log('DATA RES: ', res.data);
      console.log(
        'DATA TYPES : ',
        res.data.types.map(item => item.type),
      );
      handleDataPokemon('name', res.data.name);
      handleDataPokemon('photo', res.data.sprites.front_default);
      handleDataPokemon('height', res.data.height);
      handleDataPokemon('weight', res.data.weight);
      handleDataPokemon('species', res.data.species.name);
      handleDataPokemon(
        'type',
        res.data.types.map(item => item.type),
      );
      handleDataPokemon(
        'ability',
        res.data.abilities.map(item => item.ability),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Pokemon Detail</Text>
        <TouchableOpacity style={styles.btnCatch}>
          <Text style={{color: '#fff', paddingHorizontal: 4}}>Catch</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.containerImgTop}>
          <Image source={{uri: dataPokemon.photo}} style={styles.imgPokeTop} />
          <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
            {dataPokemon.name}
          </Text>
        </View>
        <View style={styles.containerTopDetail}>
          <View style={styles.topDetail}>
            <Text style={styles.txtLeft}>Species</Text>
            <View>
              <Text style={styles.txtRight}>: {dataPokemon.species}</Text>
            </View>
          </View>
          <View style={styles.topDetail}>
            <Text style={styles.txtLeft}>Height</Text>
            <View>
              <Text style={styles.txtRight}>: {dataPokemon.height}</Text>
            </View>
          </View>
          <View style={styles.topDetail}>
            <Text style={styles.txtLeft}>Weight</Text>
            <View>
              <Text style={styles.txtRight}>: {dataPokemon.weight}</Text>
            </View>
          </View>
        </View>
        <View style={styles.type}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Type
          </Text>
          <FlatList
            data={dataPokemon.type}
            keyExtractor={item => item.name}
            renderItem={item => {
              return <Text style={styles.card}>{item.item.name}</Text>;
            }}
          />
        </View>
        <View style={styles.type}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Ability
          </Text>
          <FlatList
            data={dataPokemon.ability}
            keyExtractor={item => item.name}
            renderItem={item => {
              return <Text style={styles.card}>{item.item.name}</Text>;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f17531',
    paddingHorizontal: 20,
  },
  btnCatch: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 5,
    elevation: 1,
    backgroundColor: '#57b7dd',
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerImgTop: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgPokeTop: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  containerTopDetail: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
  },
  topDetail: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  txtLeft: {
    width: 70,
    color: 'black',
  },
  txtRight: {
    color: 'black',
  },
  type: {
    margin: 20,
  },
  card: {
    color: 'black',
    marginTop: 4,
    backgroundColor: '#fff',
    elevation: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
