import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import WelcomeDialog from './welcomeDialog';

class Menu extends Component {    
    mostrarAvatar() {
        return (<Thumbnail 
                source={require('../../img/avatar.png')}
                large
        />); 
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
                            <ListItem>
                                <Text>Los más escuchados</Text>
                            </ListItem>
                            <ListItem>
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

export default Menu;
