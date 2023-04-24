import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
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
    RNBootSplash.hide({fade: true, duration: 500});
    console.log('Bootsplash has been hidden successfully');
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
    <SafeAreaView style={styles.mainPage}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={styles.activityIndicator}
        />
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

const styles = StyleSheet.create({
  mainPage: {backgroundColor: 'white', flex: 1},
  activityIndicator: {flex: 1, justifyContent: 'center'},
});
