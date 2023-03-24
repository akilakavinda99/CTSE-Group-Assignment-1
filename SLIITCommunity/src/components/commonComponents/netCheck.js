/* Reference: https://www.npmjs.com/package/@react-native-community/netinfo */

import React, { useEffect, useState } from "react";
import { Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
import { toastComponent } from "./toastComponent";

const NetCheck = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });
    }, []);

    const showError = () => {
        Alert.alert(
            'No Internet !',
            'Your internet does not seems to work',
            [
                { text: "Try again", onPress: refresh },
            ],
            { cancelable: false }
        )
    }

    const refresh = () => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
            if (!state.isConnected)
                showError();
            else
                toastComponent('Internet Connected', false);

        });
    }

    useEffect(() => {
        if (!isConnected) {
            showError();
        }
    }, [isConnected]);
}

export default NetCheck;