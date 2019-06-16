import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { getAllArtists } from '../../actions';
import ListArtistGrid from '../ListArtistGrid';

const ITEM_WIDTH = Dimensions.get('window').width;

class Artists extends Component {
    state = {
        columns: 2,
        artists: [],
        filtered: false
    }

    componentDidMount() {
        this.props.getAllArtists();
    }

    filterArtists = (text) => {
        const filteredArtists = this.props.users.filter(user => {
            return (user.profile.bandName.toLowerCase().includes(text.toLowerCase()));
        });
        this.setState({ artists: filteredArtists, filtered: true });
    };

    render() {
        const { columns, artists, filtered } = this.state;
        let artistData = null;
        if (this.props.loading) {
            return (
                <View style={styles.viewStyle}>
                    <Text style={{ color: 'white', marginTop: 5 }}>
                        Cargando...
                    </Text>
                </View>
            );
        }

        if (filtered) {
            artistData = artists;
        } else {
            artistData = this.props.users;
        }
        if (this.props.users.length !== 0) {
            return (
                <View style={styles.container}>
                    <SearchBar
                        placeholder='ingrese nombre del artista...'
                        containerStyle={styles.searchBarStyle} 
                        inputStyle={{ backgroundColor: 'white' }}
                        onChangeText={this.filterArtists}
                    />
                    <FlatList
                        numColumns={columns}
                        data={artistData}
                        renderItem={({ item }) => {
                            return <ListArtistGrid itemWidth={(ITEM_WIDTH - (20 * columns)) / 2} artist={item} />;
                        }}
                        keyExtractor={index => index.id}
                    />
                </View>
            );
        }

        return (
            <View style={styles.viewStyle}>
                <Text style={{ color: 'white', marginTop: 5 }}>
                    No existen artistas registrados.
                </Text>
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

const mapStateToProps = state => {
    const { users, loading } = state.userForm;

    return { users, loading };
};

// when ever any piece of state upodates, the connect helper will rerun mapStateToProps
export default connect(mapStateToProps, { getAllArtists })(Artists);
