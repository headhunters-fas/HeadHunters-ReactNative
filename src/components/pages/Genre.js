import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import ListGenreGrid from '../ListGenreGrid';

const ITEM_WIDTH = Dimensions.get('window').width;

class Genre extends Component {
    state = {
        columns: 2,
        fGenres: [
            'Country',
            'Rock'
        ],
        genres: [
            'Country',
            'Rock'
        ]
    }


    filterGenres = (text) => {
        const { fGenres } = this.state;
        const filteredGenres = fGenres.filter(genre => {
            return (genre.toLowerCase().includes(text.toLowerCase()));
        });
        this.setState({ genres: filteredGenres });
    };

    render() {
        const { columns, genres } = this.state;

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder='ingrese título de álbum...'
                    containerStyle={styles.searchBarStyle} 
                    inputStyle={{ backgroundColor: 'white' }}
                    onChangeText={this.filterGenres}
                />
                <FlatList
                    numColumns={columns}
                    data={genres}
                    renderItem={({ item }) => {
                        return <ListGenreGrid itemWidth={(ITEM_WIDTH - (20 * columns)) / 2} genre={item} />;
                    }}
                    keyExtractor={index => index.uid}
                />
            </View>
        );
    }
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0277BD'
    },
    viewStyle: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0277BD',
    },
    searchBarStyle: {
        backgroundColor: '#0277BD',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: ITEM_WIDTH
    }
});
export default Genre;
