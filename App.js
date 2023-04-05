import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Card from './components/Card';
const App = () => {
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    fetch('https://bytive2.onrender.com/getUserList')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const the = data.retrievedData;
        setData(the);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleDelete = async _id => {
    console.log(_id);
    try {
      const response = await fetch(
        `https://bytive2.onrender.com/getUserList/deleteUser/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({_id}),
        },
      );
      if (response) {
        onRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          style={{width: '100%'}}
          data={Data}
          renderItem={({item, _}) => {
            return <Card {...item} onDelete={handleDelete} />;
            console.log(item);
          }}
          keyExtractor={item => item.name}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default App;
