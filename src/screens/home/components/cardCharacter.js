import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;

export const CardCharacter = props => {
    const { item, navigation } = props;
    const colorDot = {
        'Alive': Constant.colors.greenSuccessColor,
        'unknown': Constant.colors.yellowWarningColor,
        'Dead': Constant.colors.redDangerColor
    };

    const backgroundColorDot = colorDot[item.status];

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {id: item.id})}
            style={styles.cardContainer}
        >
            <View style={styles.containerLeft}>
                <Image
                    style={styles.imageStyles}
                    source={{ uri: item.image }}
                    resizeMode={"stretch"}
                />
            </View>

            <View
                style={styles.containerRight}
            >
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.rowCenter}>
                    <View style={[ styles.circle, {backgroundColor: backgroundColorDot}]}/>
                    <Text style={styles.subTitle}>{item.status} - {item.species}</Text>
                </View>

                <Text style={styles.location}>Last known location:</Text>
                <Text style={{color: Constant.colors.whiteColor}}>{item.location.name}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 15,
        borderRadius: 15,
        height: 140,
        width: windowWidth - 30,
        flexDirection: 'row'
    },
    containerLeft: {
        flex: 1,
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        alignItems: 'center'
    },
    imageStyles: {
        height: 140,
        width: '100%',
        overflow: "hidden",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    containerRight: {
        flex: 2,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        backgroundColor: "rgba(115,115,115,0.55)",
        paddingVertical: 5,
        paddingHorizontal: 8
    },
    name: {
        color: Constant.colors.whiteColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        height: 10,
        width: 10,
        borderRadius: 20
    },
    subTitle: {
        color: Constant.colors.whiteColor,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    location: {
        color: Constant.colors.grayColor,
        paddingTop: 10
    }
});
