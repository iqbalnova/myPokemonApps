import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {pokeball} from '../assets/images';

export default function CardPokemon({name}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Image source={pokeball} style={{width: 30, height: 30}} />
        <Text style={styles.txt}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 8,
    width: 160,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    alignItems: 'center',
  },
  txt: {
    marginLeft: 20,
    color: 'black',
  },
});
