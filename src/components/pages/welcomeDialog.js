import React, { Component } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Dialog, ConfirmDialog } from "react-native-simple-dialogs";
import AlbaLogo from '../../img/AlbumLogo.png';
import { setAccount, saveProfile } from '../../actions';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        flex: 1,
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: "center",
    },
    instructionsText: {
        color: "#333333",
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
    },
});

class WelcomeDialog extends Component {
    state = {
        showDialog: true,
        showConfirm: false,
        uid: ''
    }

    openDialog = (show) => {
        this.setState({ showDialog: show });
        this.setState({ showConfirm: true });
    }

    openConfirm = (show) => {
        this.setState({ showConfirm: show });
    }

    optionBanda = () => {
        this.props.setAccount('banda');
        const profile = {
            accountType: 'banda'
        };
        this.props.saveProfile(profile);
        this.openConfirm(false);
    }

    optionConsumidor = () => {
        this.props.setAccount('consumidor');
        const profile = {
            accountType: 'consumidor'
        };
        this.props.saveProfile(profile);
        this.openConfirm(false);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Dialog
                    titleStyle={{ textAlign: 'center' }}
                    contentStyle={
                            {
                                alignItems: "center",
                                justifyContent: "center"
                            }
                        }
                    title="¡Bienvenido!"
                    animationType="fade"
                    onTouchOutside={ () => this.openDialog(false) }
                    visible={ this.state.showDialog }
                >
                    <Image
                        source={AlbaLogo}
                        style={
                            {
                                width: 99,
                                height: 87,
                                marginTop: 10,
                                resizeMode: "contain",
                            }
                        }
                    />
                    <Text style={ { marginVertical: 30 } }>
                        Bienvenido a álbum app, una aplicación en la que podrás gestionar tus canciones y escuchar a tus artistas favoritos y, ¿por que no?,
                         hacer que el mundo de escuche. ¿Listo para empezar?
                    </Text>
                    <Button
                        onPress={ () => this.openDialog(false) }
                        style={{ marginTop: 10, width: 100, paddingHorizontal: 16, }}
                        title="Sí"
                    />
                </Dialog>

                <ConfirmDialog
                    titleStyle={{ textAlign: 'center' }}
                    title="Confirmar tipo de cuenta"
                    visible={ this.state.showConfirm }
                    negativeButton={
                        {   
                            title: "Consumidor",
                            onPress: this.optionConsumidor,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "Banda",
                            onPress: this.optionBanda,
                        }
                    }
                />
            </View>
        );
    }
}

export default connect(null, { setAccount, saveProfile })(WelcomeDialog);
