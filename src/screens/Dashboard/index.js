import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {baseUrl} from '../../helpers/API';
import CardPokemon from '../../components/CardPokemon';

export default function Dashboard() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPokemonData();
  }, [currentOffset]);

  const getPokemonData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/pokemon?offset=${currentOffset}&limit=18`,
      );
      setPokemon([...res.data.results]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = useCallback(() => {
    setCurrentOffset(currentOffset + 18);
    setCurrentPage(currentPage + 1);
  }, [currentOffset, currentPage]);

  const prevPage = useCallback(() => {
    if (currentOffset <= 0) {
      return;
    } else {
      setCurrentOffset(currentOffset - 18);
      setCurrentPage(currentPage - 1);
    }
  }, [currentOffset, currentPage]);

  const renderItem = ({item}) => <CardPokemon name={item.name} />;

  const renderHeader = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginHorizontal: 10,
            padding: 10,
            color: 'black',
          }}>
          PokeDex
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={prevPage}
          style={{
            backgroundColor: '#f17531',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>Sebelumnya</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 10, color: 'black'}}>
          {currentPage}
        </Text>
        <TouchableOpacity
          onPress={nextPage}
          style={{
            backgroundColor: '#57b7dd',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>Berikutnya</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={pokemon}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
