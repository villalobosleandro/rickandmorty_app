import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

import { ImageOverlay } from './../../shared/image-overlay.component';
import { ProfileParameter } from './components/profile-parameter';

export const CharacterDetail = props => {
    const {id} = props.route.params;
    const [loading, setLoading] = useState(true);
    const [characterDetail, setCharacterDetail] = useState({});

    useEffect(() => {
        _getDetailCharacter();
    }, []);

    const _getDetailCharacter = async () => {
        fetch(`${Constant.detailUrl}${id}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setCharacterDetail(data)

                // setCharacters(data.results)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    if(loading) {
        return(
            <View style={styles.activityStyles}>
                <ActivityIndicator size="large" color={Constant.colors.whiteColor}/>
            </View>
        );
    }

    return (
        <ImageOverlay
            style={styles.container}
            source={{uri: characterDetail.image}}>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>
                    {characterDetail.name}
                </Text>
                <Text  style={styles.profileLocation}>
                    {characterDetail.location ? characterDetail.location.name : 'Unknown'}
                </Text>

                <Text style={{color: Constant.colors.grayColor}}>Location</Text>

                <View style={styles.profileParametersContainer}>
                    <View style={styles.flex1}>
                        <ProfileParameter
                            hint='Species'
                            value={characterDetail.species}
                        />
                    </View>

                    <View style={styles.flex1}>
                        <ProfileParameter
                            hint='Gender'
                            value={characterDetail.gender}
                        />
                    </View>

                    <View style={styles.flex1}>
                        <ProfileParameter
                            hint='Origin'
                            value={characterDetail.origin ? characterDetail.origin.name : 'Unknown'}
                        />
                    </View>

                    <View style={styles.flex1}>
                        <ProfileParameter
                            hint='Status'
                            value={characterDetail.status}
                            status={true}
                        />
                    </View>
                </View>
            </View>
        </ImageOverlay>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileDetailsContainer: {
        position: 'absolute',
        paddingHorizontal: 24,
        paddingBottom: 32,
        left: 0,
        right: 0,
        bottom: 0,
    },
    profileName: {
        marginVertical: 16,
        color: Constant.colors.whiteColor,
        fontSize: 32,
        fontWeight: 'bold'
    },
    profileLocation: {
        marginVertical: 8,
        color: Constant.colors.whiteColor,
        fontSize: 24,
    },
    profileParametersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 64,
    },
    activityStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constant.colors.backgroundColorPrimary
    },
    flex1: {
        flex: 1
    }
});
