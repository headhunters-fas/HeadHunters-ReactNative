import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { genreAll, getUserProfile } from '../../actions';
import Helpers from '../../lib/helpers';
import WelcomeDialog from './welcomeDialog';

class Menu extends Component {    
    state = {
        avatarUrl: '',
        uid: '',
    }
    
    async componentDidMount() {
        this.props.getUserProfile();
        try {
            const user = await firebase.auth().currentUser;

            Helpers.getImageUrl(user.uid, (imageUrl) => {
                this.setState({ avatarUrl: imageUrl });
            });
            this.setState({ uid: user.uid });
        } catch (error) {
            console.log(error);
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.profile === '') {
            this.props.getUserProfile();
        }
    }

    mostrarAvatar() {
        if (this.state.avatarUrl) {
            return (<Image 
            style={{ width: 100, height: 100, borderRadius: 150 / 2 }}
            source={{ uri: this.state.avatarUrl }}
            />);
        } 
        return (<Thumbnail 
                source={require('../../img/avatar.png')}
                large
        />); 
    }

    displayAllGenres() {
        this.props.genreAll();    
        Actions.albumList();
    }

    renderWelcomeDialog() {
        if (this.props.profile === '') {
            return <WelcomeDialog />;
        }  
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderWelcomeDialog()}
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                    {this.mostrarAvatar()}
                    <Text style={{ color: 'white' }}>
                    {this.props.profile !== null ? this.props.profile.username : ''}
                    </Text>
                    <Text style={{ color: 'white' }}>
                    {this.props.profile !== null ? this.props.profile.accountType : '' }
                    </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Content>
                        <List>
                            <ListItem onPress={this.displayAllGenres.bind(this)}>
                                <Text>Los más escuchados</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.genre()}>
                                <Text>buscar por género</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.profile({ 
                                avatar: this.state.avatarUrl })}
                            >
                                <Text>Perfil</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.artists()}>
                                <Text>Artistas</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.auth()}>
                                <Text>Cerrar sesión</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ albums, userForm }) => {
    const { genre } = albums;
    const { profile, account } = userForm;
  
    return { genre, account, profile };
  };

export default connect(mapStateToProps, { genreAll, getUserProfile })(Menu);
