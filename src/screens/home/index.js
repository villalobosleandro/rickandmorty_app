import React, {useState, useEffect} from 'react';
import {
    Text, FlatList, View, ActivityIndicator, SafeAreaView,
    StyleSheet, Image, TouchableOpacity
} from 'react-native';

import { CardCharacter } from './components/cardCharacter';

let stopFetchMore = true;

export const Home = props => {
    const { navigation } = props;
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [handleLoadMore , setHandleLoadMore] = useState(false);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        _getCharacter();
    }, []);


    const _getCharacter = async () => {
        fetch(Constant.url)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setCharacters(data.results);
                setNextPage(data.info.next);

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

    const _loadMoreData = async () => {

        fetch(nextPage)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setCharacters([...characters, ...data.results]);
                setNextPage(data.info.next);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const loadMoreDataComponent = () => (
            <TouchableOpacity
                onPress={() => _loadMoreData()}
                style={styles.buttonLoadMore}
            >
                <Text style={styles.textLoadMore}>Load More...</Text>
            </TouchableOpacity>
        );


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
                ListFooterComponentStyle={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 10
                }}
                ListFooterComponent={nextPage
                    ? loadMoreDataComponent
                    : null
                }
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
   },
    textLoadMore: {
        color: Constant.colors.whiteColor,
        fontWeight: 'bold'
    },
    buttonLoadMore: {
        width: 100,
        height: 60,
        backgroundColor: "rgba(115,115,115,0.55)",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
   }
});
