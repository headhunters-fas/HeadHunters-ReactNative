import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { genreAll } from '../../actions';
import WelcomeDialog from './welcomeDialog';

class Menu extends Component {    
    mostrarAvatar() {
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
        return <WelcomeDialog />;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderWelcomeDialog()}
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                    {this.mostrarAvatar()}
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
                            <ListItem>
                                <Text>Cerrar sesión</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ albums }) => {
    const { genre, account } = albums;
  
    return { genre, account };
  };

export default connect(mapStateToProps, { genreAll })(Menu);
