import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { albumDelete, albumsFetch } from '../../actions';
import { Text, View, Image, ScrollView } from 'react-native';
import { CardSection, Button, Card, Confirm } from '../common';
import { styles } from '../common/AlbumStyles';

class AlbumDetail extends Component {
    state = { showModal: false };

    onAccept() {
        const { title, id } = this.props.Item;
        this.props.albumDelete({ title, id });
        this.props.albumsFetch(true);
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false });
    }
    
    OnButtonPress() {
        Actions.songList({ album: this.props.Item });
    }

    render() {
        const { title, artist, thumbnailImage, image } = this.props.Item;
        const { headerContentStyle, thumbnailStyle, thumbnailContainerStyle,
            headerTextStyle, imageStyle } = styles;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
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

                        <CardSection>
                            <Button onPress={this.OnButtonPress.bind(this)}>
                                Ver álbum
                            </Button>
                        </CardSection>

                        <CardSection>
                            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                                Eliminar
                            </Button>
                        </CardSection>

                        <Confirm 
                            visible={this.state.showModal}
                            onAccept={this.onAccept.bind(this)}
                            onDecline={this.onDecline.bind(this)}
                        >
                            <Text style={{ color: 'white' }}>¿Estás seguro que deseas eliminar este álbum?</Text>
                        </Confirm>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

export default connect(null, { albumDelete, albumsFetch })(AlbumDetail);

