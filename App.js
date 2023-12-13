import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const One = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://free-nba.p.rapidapi.com/players?page=1&per_page=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '71234fafc3mshe4501492c79f043p127fdejsna3467bfd98bf',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity onPress={() => setFlag(!flag)}>
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
            <Text style={styles.description}> Позиция : {item.position}</Text>
            {flag && 
              <Text style={styles.description}> Команда : {item.team.full_name}</Text> 
            }
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default One;