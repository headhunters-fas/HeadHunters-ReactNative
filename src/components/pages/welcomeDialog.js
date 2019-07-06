import React, { Component } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { connect } from 'react-redux';
import { Dialog } from "react-native-simple-dialogs";
import firebase from 'firebase';
import HeadHuntersLogo from '../../img/HeadHuntersLogo.png';
import { setAccount, saveProfile, getUserProfile } from '../../actions';
import Helpers from '../../lib/helpers';

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

    async componentDidMount() {
        const user = await firebase.auth().currentUser;
        this.setState({ uid: user.uid });
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
        Helpers.setAccountType(this.state.uid, 'banda');
        this.openConfirm(false);
    }

    optionConsumidor = () => {
        this.props.setAccount('consumidor');
        const profile = {
            accountType: 'consumidor'
        };
        this.props.saveProfile(profile);
        Helpers.setAccountType(this.state.uid, 'consumidor');
        this.openConfirm(false);
    }

    optionHeadhunter = () => {
        this.props.setAccount('heandunter');
        const profile = {
            accountType: 'heandunter'
        };
        this.props.saveProfile(profile);
        Helpers.setAccountType(this.state.uid, 'heandunter');
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
                    animationType="fade"
                    onTouchOutside={ () => this.openDialog(false) }
                    visible={ this.state.showDialog }
                >
                    <Image
                        source={HeadHuntersLogo}
                        style={
                            {
                                width: 300,
                                height: 250,
                                marginTop: 2,
                                resizeMode: "contain",
                            }
                        }
                    />
                    <Text style={ { marginBottom: 15, fontSize: 18 } }>
                        ¡Bienvenido a HeadHunters!
                    </Text>

                    <Text style={ { marginVertical: 30 } }>
                        Si estás buscando la mejor app streaming ya puedes parar. ¡Escucha las nuevas tendencias,
                        encuentra una banda que te guste y apóyala!
                    </Text>
                    <Button
                        onPress={ () => this.openDialog(false) }
                        style={{ marginTop: 10, width: 100, paddingHorizontal: 16, }}
                        title="Continuar"
                    />
                </Dialog>

                <Dialog
                    titleStyle={{ textAlign: 'center' }}
                    contentStyle={
                            {
                                alignItems: "center",
                                justifyContent: "center"
                            }
                        }
                    animationType="fade"
                    visible={ this.state.showConfirm }
                >
                    <Image
                        source={HeadHuntersLogo}
                        style={
                            {
                                width: 300,
                                height: 250,
                                marginTop: 2,
                                resizeMode: "contain",
                            }
                        }
                    />
                    <Text style={ { marginBottom: 15, fontSize: 18 } }>
                        Para empezar, necesitamos saber su tipo de cuenta:
                    </Text>

                    <Text 
                        style={ { marginVertical: 10, color: 'blue' }}
                        onPress={ () => this.optionConsumidor()}>
                        Solo soy un fan
                    </Text>
                    <Text 
                        style={ { marginVertical: 10, color: 'blue' }}
                        onPress={ () => this.optionBanda()}>
                        Soy parte de una banda o solista
                    </Text>
                    <Text 
                        style={ { marginVertical: 10, color: 'blue' }}
                        onPress={ () => this.optionHeadhunter()}>
                        HeadHunter
                    </Text>
                </Dialog>
            </View>
        );
    }
}

export default connect(null, { setAccount, saveProfile, getUserProfile })(WelcomeDialog);
