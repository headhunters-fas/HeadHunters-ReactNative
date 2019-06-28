import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { genreAll, getUserProfile } from '../../actions';
import WelcomeDialog from './welcomeDialog';

class Menu extends Component {    
    mostrarAvatar() {
        return (<Thumbnail 
                source={require('../../img/avatar.png')}
                large
        />); 
    }

    componentDidMount() {
        this.props.getUserProfile();
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
        console.log(this.props.profile);
        return (
            <View style={{ flex: 1 }}>
                {this.renderWelcomeDialog()}
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                    {this.mostrarAvatar()}
                    <Text style={{ color: 'white' }}>
                    {this.props.profile !== null ? this.props.profile.username : '' }
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
                            <ListItem onPress={() => Actions.profile()}>
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
