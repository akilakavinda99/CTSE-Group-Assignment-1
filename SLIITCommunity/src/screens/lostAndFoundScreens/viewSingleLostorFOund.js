import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import {AppLayout, SCREEN_HEIGHT} from '../../styles/appStyles';

const ViewSingleLostorFOund = ({route}) => {
  const post = route.params.post;
  return (
    <ScrollView>
      <Image
        source={{
          uri: post.ItemImage,
        }}
        resizeMode="cover"
        style={viewSingleLostorFOundStyles.imageStyles}
      />
      <View style={[viewSingleLostorFOundStyles.mainView]}>
        <Text style={viewSingleLostorFOundStyles.title}>{post.ItemName}</Text>
        <View style={viewSingleLostorFOundStyles.secondaryView}>
          <Text style={viewSingleLostorFOundStyles.postedDate}>
            {post.PostedDate}
          </Text>
          <Text style={viewSingleLostorFOundStyles.type}>
            {post.Type.toUpperCase()}
          </Text>
          <View>
            <Text style={viewSingleLostorFOundStyles.description}>
              {post.ItemDescription}
            </Text>
          </View>
        </View>
        <View style={viewSingleLostorFOundStyles.buttonWrapper}>
          <ButtonComponent backgroundColor="blue" buttonText="Edit" />

          <ButtonComponent backgroundColor="red" buttonText="Delete" />
        </View>
      </View>
    </ScrollView>
  );
};

const viewSingleLostorFOundStyles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    marginBottom: 10,
  },
  mainView: {
    // paddingRight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingLeft: 18,
  },
  postedDate: {
    // paddingLeft: 20,
    // marginRight: 10,
  },
  secondaryView: {
    alignItems: 'center',
  },
  type: {
    // marginLeft: 25,
  },
  description: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,

    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default ViewSingleLostorFOund;
