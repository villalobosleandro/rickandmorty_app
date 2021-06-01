import React, {useState, useEffect} from 'react';
import {
    Text, FlatList, View, ActivityIndicator, SafeAreaView,
    StyleSheet, Image
} from 'react-native';

import { CardCharacter } from './components/cardCharacter';

let stopFetchMore = true;

export const Home = props => {
    const { navigation } = props;
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [handleLoadMore , setHandleLoadMore] = useState(false);

    useEffect(() => {
        _getCharacter();
    }, []);


    const _getCharacter = async () => {
        fetch(Constant.url)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setCharacters(data.results)
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

    const renderSeparator = () => (
        <View style={styles.separator10}/>
    );

    const ListEmpty = () => (
        <View style={styles.emptyList}>
            <Image
                style={styles.imageEmpty}
                source={Constant.images.empty}
            />
            <Text style={styles.textEmpty}>The list is empty</Text>
        </View>
    );

    const loadMoreData = async () => {
        console.log("test");
        if(!stopFetchMore) {
            console.log("llamo mas data");
            stopFetchMore = true;
        }
    };

    return(
        <SafeAreaView
            style={styles.container}
        >
            <FlatList
                data={characters}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <CardCharacter
                        item={item}
                        navigation={navigation}
                    />
                }
                ListEmptyComponent={ListEmpty}
                ItemSeparatorComponent={renderSeparator}
                contentContainerStyle={{paddingVertical: 16}}
                // ListFooterComponent={<Text>hola</Text>}
                // onEndReached={loadMoreData}
                // onEndReachedThreshold={0.5}
                // onScrollBeginDrag={() => {
                //     stopFetchMore = false;
                // }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
   activityStyles: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: Constant.colors.backgroundColorPrimary
   },
    separator10: {
        height: 10
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textEmpty: {
       color: Constant.colors.whiteColor,
        fontSize: 30,
        fontWeight: 'bold'
    },
    container: {
        backgroundColor: Constant.colors.backgroundColorPrimary,
        flex: 1
    },
    imageEmpty: {
       height: 400,
        width: 300
   }
});
