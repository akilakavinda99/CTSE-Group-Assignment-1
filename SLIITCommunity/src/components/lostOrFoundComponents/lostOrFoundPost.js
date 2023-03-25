import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const LostOrFoundPost = ({post, id, itNumber}) => {
  // console.log('This is post', post);
  const [showButtons, setShowButtons] = useState(false);

  const handleCardPress = () => {
    setShowButtons(true);
  };

  const handleDeletePress = () => {
    // TODO: Handle delete functionality
  };

  const handleEditPress = () => {
    // TODO: Handle edit functionality
  };

  const navigation = useNavigation();
  return (
    <View
      style={{
        marginBottom: 20,
      }}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ViewSingleLostorFound', {
            post: post,
            id: id,
            itNumber,
          })
        }>
        <View style={[lostOrFoundPostStyles.mainView]}>
          {/* <BlurView
            blurType="light"
            blurAmount={100}
            reducedTransparencyFallbackColor="white"> */}
            <View>
              <View>
                <Image
                  source={{uri: post.ItemImage}}
                  resizeMode="cover"
                  style={lostOrFoundPostStyles.imageStyle}
                />
              </View>
              <View style={lostOrFoundPostStyles.secondaryView}>
                <View style={lostOrFoundPostStyles.nameView}>
                  <Text style={lostOrFoundPostStyles.itemName}>
                    {post.ItemName}
                  </Text>
                  <Text
                    style={[
                      lostOrFoundPostStyles.type,
                      post.Type == 'Lost'
                        ? {
                            color: 'red',
                          }
                        : {
                            color: 'green',
                          },
                    ]}>
                    {post.Type.toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text numberOfLines={3} ellipsizeMode="tail">
                    {post.ItemDescription}
                  </Text>
                </View>
              </View>
            </View>
          {/* </BlurView> */}
          {showButtons && <Text>Blurred</Text>}
        </View>
      </TouchableWithoutFeedback>
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
  },
});

export default LostOrFoundPost;
