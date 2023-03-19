import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { primaryColors } from '../../styles/colors';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={primaryColors.primaryBlue} />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    }
};

export default Loading;
