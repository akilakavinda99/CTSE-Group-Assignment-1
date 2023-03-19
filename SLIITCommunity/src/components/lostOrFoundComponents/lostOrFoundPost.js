import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const LostOrFoundPost = ({post, id}) => {
  return (
    <View style={[lostOrFoundPostStyles.mainView]}>
      <View>
        <Image
          source={{uri: post.ItemImage}}
          resizeMode="cover"
          style={lostOrFoundPostStyles.imageStyle}
        />
      </View>
      <View style={lostOrFoundPostStyles.secondaryView}>
        <View style={lostOrFoundPostStyles.nameView}>
          <Text style={lostOrFoundPostStyles.itemName}>{post.ItemName}</Text>
          <Text style={lostOrFoundPostStyles.type}>
            {post.Type.toUpperCase()}
          </Text>
        </View>
        <View>
          <Text>{post.ItemDescription}</Text>
        </View>
      </View>
    </View>
  );
};

const lostOrFoundPostStyles = StyleSheet.create({
  mainView: {
    borderRadius: 30,
    borderColor: '#F6F6F680',
    // borderWidth: 1,
    height: 250,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  imageStyle: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  secondaryView: {
    marginLeft: 10,
    marginRight: 10,
  },
  nameView: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: '800',
    fontSize: 20,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
});

export default LostOrFoundPost;
