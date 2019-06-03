import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { CardSection, Button, Logo } from '../common';
import { SignForm, styles } from '../common/SignForm';
import Spinner from 'react-native-spinkit';

class LoginForm extends Component {
    onEmailChangeText(text) {
        this.props.emailChanged(text);
    }   

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        const newUser = {
            username: email,
            password,
        };

        this.props.loginUser(newUser);
    }

    signUp() {
        Actions.signup();
    }

    renderPasswordError() {
        if (this.props.error.password !== '') {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error.password}
                    </Text>
                </View>
            );
        }
    }

    renderEmailError() {
        if (this.props.error.username !== '') {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error.username}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <View style={styles.spinnerStyle}>
                    <Spinner color={'white'} size={37} type={'Circle'} />
                </View>
            );
        }

        return (
            <CardSection>
                <Button onPress={this.onButtonPress.bind(this)}>
                    Iniciar Sesión
                </Button>
            </CardSection>
        );
    } 

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={styles.logoContainer}>
                    <Logo title="Album App" />
                </View>
                
                <SignForm 
                    Email={this.onEmailChangeText.bind(this)} 
                    EmailError={this.renderEmailError()}
                    Password={this.onPasswordChange.bind(this)} 
                />  

                {this.renderPasswordError()}
                {this.renderButton()} 
                <CardSection>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.singupText}>¿No tienes una cuenta todavía? </Text>
                        <TouchableOpacity onPress={this.signUp.bind(this)}><Text style={styles.singupButton}>Regístrate</Text></TouchableOpacity>
                    </View>
                </CardSection>
            </View>
        );
    }
}

const mapStateTpProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    
    return { email, password, error, loading };
};

export default connect(mapStateTpProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);
