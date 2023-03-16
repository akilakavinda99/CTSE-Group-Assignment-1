import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TimePickerAndroid, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputComponent from './textInputComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePickerExample = () => {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (event, time) => {
        if (Platform.OS === 'android') {
            hideTimePicker();
        }
        setSelectedTime(time || selectedTime);
    };

    return (

        <View>
            <View style={styles.container}>
                <TextInputComponent
                    rightIcon="calendar"
                    placeholder="Select Date"
                    marginBottom={20}
                    value={selectedTime.toLocaleTimeString()}
                >
                </TextInputComponent>
                <Icon style={styles.icon} name="clock-o" size={20} color="#000" onPress={showTimePicker} />
            </View>

            {isTimePickerVisible && (
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    display="default"
                    value={selectedTime}
                    onConfirm={handleConfirm}
                    onCancel={hideTimePicker}
                    onChange={handleConfirm}
                />
            )}
        </View>



        // <View style={styles.container}>
        // <TextInputComponent
        //   style={styles.textInput}
        //   placeholder="Select Time"
        //   editable={false}
        // //   value={selectedTime}
        // />
        // <Icon style={styles.icon} name="calendar" size={20} color="#000" onPress={showTimePicker} />

        //         </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        right: 10,
        marginRight: 10,
        top: 15,
        alignItems: 'center',
        color: '#242D66',
    },
});

export default TimePickerExample;
