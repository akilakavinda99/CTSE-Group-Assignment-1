import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { MESSAGE_API_URL, MESSAGE_API_KEY } from '@env'

/***********
Reffered from:
    https://rnfirebase.io/messaging/usage 
    https://rnfirebase.io/messaging/notifications

***********/

// Get the device token
export const getMessagingToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        return fcmToken;
    } else {
        console.log('Failed', 'No token received');
        return null;
    }
};

export const sendNotification = async (title, body, users) => {
    try {
        const res = await fetch(MESSAGE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${MESSAGE_API_KEY}`
            },
            body: JSON.stringify({
                registration_ids: users,
                priority: 'high',
                notification: {
                    title: title,
                    body: body,
                    sound: 'default',
                    show_in_foreground: true,
                },
            }),
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

export const notificationSetup = async () => {

    // Android - Requesting permissions
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    // iOS - Requesting permissions
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        // console.log('Authorization status:', authStatus);
    }

    // When the application is running, but in the background by clicking on the notification
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // When the application is opened from a quit state
    messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    // When the application is running in the foreground
    messaging().onMessage(async remoteMessage => {
        console.log(
            'A new FCM message arrived!',
            JSON.stringify(remoteMessage)
        );
    });

    // When the application is running in the background or quit state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log(
            'Message handled in the background!',
            remoteMessage
        );
    });
};
