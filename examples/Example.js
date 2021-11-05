import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FloatingHeart } from 'react-native-floating-heart';

const App = () => {
  const [heartCount, setHeartCount] = useState(0);

  const renderStar = () => (
    <Icon name="star" size={30} style={{ color: 'pink' }} />
  )

  const addHeart = () => {
    let newCount = heartCount + 1;
    setHeartCount(newCount++);
  }

	return <View style={styles.container}>
    <Text style={[styles.description, { fontSize: 20 }]}>React Native Metamask Phrase Word Example</Text>
    <Text style={styles.description}>Select each word in the order it was presented to you.</Text>
    <FloatingHeart count={heartCount} renderCustomIcon={renderStar}/>
    <TouchableOpacity style={{ width: 320, height: 40, borderWidth: 1, borderColor: '#000', borderRadius: 18, marginTop: 20, alignItems: 'center', justifyContent: 'center' }} onPress={addHeart}>
      <Text style={{ fontWeight: '500' }}>Complete Backup</Text>
    </TouchableOpacity>
	</View>;
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
  description: {
    width: 300,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
    fontSize: 15,
  },
  value: {
    marginBottom: 10,
    color: '#FF4A8D',
    fontWeight: '500',
  },
  displayItemContainer: {
    margin: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayButton: {
    flexDirection: 'column',
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 13,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  displaySelectedButton: {
    flexDirection: 'column',
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#7057FF',
    borderRadius: 13,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
});
