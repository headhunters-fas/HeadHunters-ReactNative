import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View, Image, AsyncStorage } from 'react-native';
import { albumAdd, albumsFetch } from '../../actions';
import { CardSection, Button, Card } from '../common';
import { styles } from '../common/AlbumStyles'; 
import Helpers from '../../lib/helpers';

let DEMO_TOKEN;

class AlbumSum extends Component {
    state = { loading: true };

    async componentDidMount() {
        DEMO_TOKEN = await AsyncStorage.getItem('id_token');
        this.props.albumsFetch();
    }
    
    OnButtonPress() {
        const { title, artist, thumbnailImage, image, url, songList, id, likes } = this.props.albumData; 
        let songs = [];
        songList.map(song => 
            songs.push({
                albumArtUrl: song.albumArtUrl,
                artist: song.artist,
                audioUrl: song.audioUrl,
                title: song.title
            })
        );
        const album = {
            title,
            artist,
            thumbnailImage,
            image,
            url,
            songList: songs
        };
        
        this.props.albumAdd(album);

        Helpers.updateAlbumLikes(id, likes, DEMO_TOKEN);

        this.props.albumsFetch();
    }

    load() {
        if (this.props.albums !== null) {
            if (this.props.albums.filter(album => album.title === this.props.albumData.title).length !== 0) {
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false });
            }
        }
    }

    renderButton() {    
        if (this.props.albums !== null) {
            if (this.props.albums.filter(album => album.title === this.props.albumData.title).length !== 0) {
                return (
                    <View style={ownStyles.textStyle}>
                        <Text style={{ color: 'black', margin: 5 }}>Álbum agregado</Text>
                    </View>
                );
            }
        }

        return (
            <CardSection>
                <Button onPress={this.OnButtonPress.bind(this)}>
                    Agregar a la playlist
                </Button>
            </CardSection>
        );
    }

    render() {
        const { title, artist, thumbnailImage, image } = this.props.albumData;
        const { headerContentStyle, thumbnailStyle, thumbnailContainerStyle,
            headerTextStyle, imageStyle } = styles;
        
        if (this.state.loading) {
            this.load();
            return <View />;
        }
        return (
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image style={thumbnailStyle} source={{ uri: thumbnailImage }} />
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{title}</Text>
                        <Text>{artist} </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <Image style={imageStyle} source={{ uri: image }} />
                </CardSection>
                {this.renderButton()}  
            </Card>
        ); 
    }
}

const ownStyles = {
    viewStyle: {
        backgroundColor: '#0277BD',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }
};

const mapStateToProps = state => {
    const { loading, albums } = state.albums;

    return { loading, albums };
};

// when ever any piece of state upodates, the connect helper will rerun mapStateToProps
export default connect(mapStateToProps, { albumAdd, albumsFetch })(AlbumSum);
