import React from 'react';
import { StyleSheet, View, ViewProps, Text } from 'react-native';

export const ProfileParameter = (props) => {

    const { style, hint, value, status, ...viewProps } = props;
    const colorDot = {
        'Alive': Constant.colors.greenSuccessColor,
        'unknown': Constant.colors.yellowWarningColor,
        'Dead': Constant.colors.redDangerColor
    };

    const backgroundColorDot = colorDot[value];

    return (
        <View
            {...viewProps}
            style={[styles.container, style]}>
            <Text
                style={[styles.responseTextSize, {
                    color: status ? backgroundColorDot : '#fff',
                    fontWeight: status ? 'bold' : 'normal'
                }]}
                numberOfLines={1}
            >
                {value}
            </Text>
            <Text
                style={styles.titleText}
                numberOfLines={1}
            >
                {hint}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    titleText: {
        color: '#fff'
    },
    responseTextSize: {
        fontSize: 18
    }
});
