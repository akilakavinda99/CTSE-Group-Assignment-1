import React from "react";
import { StyleSheet, View } from "react-native";
import { primaryColors } from "../../styles/colors";

const HorizontalLine = () => {
    return (
        <View
            style={{
                width: "100%",
                borderBottomColor: primaryColors.background,
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />
    );
}

export default HorizontalLine;