import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { MESSAGE_API_URL, MESSAGE_API_KEY } from '@env'
import { getDataFromAsync } from '../constants/asyncStore';
import asyncStoreKeys from '../constants/asyncStoreKeys';

/***********
Reffered from:
    https://rnfirebase.io/messaging/usage 
    https://rnfirebase.io/messaging/notifications

***********/

// Collection references
const communityRef = firestore().collection('communities')
const userRef = firestore().collection('Users')

// Get the device token
export const getMessagingToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        // console.log('Your Firebase Token is:', fcmToken);
        return fcmToken;
    } else {
        console.log('Failed', 'No token received');
        return null;
    }
};

// Update messaging token
export const updateMessagingToken = async (token, itNumber) => {
    try {
        const ref = firestore()
            .collection('Users')
            .doc(itNumber)
        const doc = await ref.get();
        if (doc._exists) {
            await ref.update({
                messagingToken: token
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// Subscribe to a community
export const subscribeCommunity = async (communityId, itNumber) => {
    try {
        await communityRef.doc(communityId).update({
            subscribers: firestore.FieldValue.arrayUnion(itNumber)
        });

        await userRef.doc(itNumber).update({
            subscribedCommunities: firestore.FieldValue.arrayUnion(communityId)
        });

    } catch (error) {
        console.log(error);
    }
};

// Unsubscribe from a community
export const unsubscribeCommunity = async (communityId, itNumber) => {
    try {
        await communityRef.doc(communityId).update({
            subscribers: firestore.FieldValue.arrayRemove(itNumber)
        });

        await userRef.doc(itNumber).update({
            subscribedCommunities: firestore.FieldValue.arrayRemove(communityId)
        });
    } catch (error) {
        console.log(error);
    }
};

// Get the messaging tokens of the subscribed users
export const getSubscribedUsers = async (communityId) => {
    try {
        const doc = await communityRef.doc(communityId).get();
        if (doc._exists) {
            const subscribers = doc.data().subscribers;
            const users = await userRef.where(firestore.FieldPath.documentId(), 'in', subscribers).get();
            const tokens = users.docs.map(doc => doc.data().messagingToken);
            return tokens;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

// Send notification to the device
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

    // Token refresh
    messaging().onTokenRefresh(fcmToken => {
        getDataFromAsync(asyncStoreKeys.IT_NUMBER).then(userId => {
            updateMessagingToken(fcmToken, userId)
        });
    });
};
