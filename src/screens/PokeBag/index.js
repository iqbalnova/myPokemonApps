import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardPokemon from '../../components/CardPokemon';
import {useSelector} from 'react-redux';
import {myDb} from '../../helpers/DB';

const PokeBag = ({navigation}) => {
  const [dataPokeBag, setDataPokeBag] = useState([]);

  const {_user} = useSelector(state => state.login);

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getPokeBag();
    setRefresh(false);
  };

  useEffect(() => {
    getPokeBag();
  }, [_user]);

  const renderItem = ({item}) => (
    <CardPokemon
      onPress={() => navigation.navigate('Detail', {pokeName: item})}
      name={item}
    />
  );

  const getPokeBag = async () => {
    try {
      const res = await myDb.ref(`pokeBag/${_user._id}/`).once('value');

      console.log('RES POKEBAG: ', res.val());
      setDataPokeBag(res.val().name);
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginHorizontal: 10,
            padding: 10,
            color: 'black',
          }}>
          PokeBag
        </Text>
      </View>
    );
  };
  console.log('DATA POKEBAGGG: ', dataPokeBag);
  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        numColumns={2}
        data={dataPokeBag}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default PokeBag;
