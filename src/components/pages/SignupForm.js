import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged,
     passwordChanged,
     confirmPasswordChanged,
     signupUser } from '../../actions';
import { CardSection, Button, Logo } from '../common';
import { SignForm, styles } from '../common/SignForm';
import Spinner from 'react-native-spinkit';

class SignupForm extends Component {
    onEmailChangeText(text) {                     
        this.props.emailChanged(text);
    }   

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onConfirmPassword(text) {
        this.props.confirmPasswordChanged(text);
    }

    onButtonPress() {
        const { email, password, confirmPassword } = this.props;

        const newUser = {
            username: email,
            password,
            confirmPassword
        };

        this.props.signupUser(newUser);
    }

    logIn() {
        Actions.login();
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
        if (this.props.error.username !== '' || this.props.error.message !== '') {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error.username}
                        {this.props.error.message}
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
                    Registrarse
                </Button>
            </CardSection>
        );
    } 

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={styles.logoContainer}>
                    <Logo title="Registrar nueva cuenta" />                  
                </View>
               
                <SignForm 
                    Email={this.onEmailChangeText.bind(this)} 
                    EmailError={this.renderEmailError()}
                    Password={this.onPasswordChange.bind(this)} 
                    ConfirmPassword={this.onConfirmPassword.bind(this)}    
                />   

                {this.renderPasswordError()}
                {this.renderButton()} 
                <CardSection>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.singupText}>¿Ya tienes una cuenta? </Text>
                        <TouchableOpacity onPress={this.logIn.bind(this)}><Text style={styles.singupButton}>Iniciar sesión</Text></TouchableOpacity>
                    </View>
                </CardSection>
            </View>
        );
    }
}

const mapStateTpProps = ({ sinup }) => {
    const { email, password, confirmPassword, error, loading } = sinup;
    return { email, password, confirmPassword, error, loading };
};

export default connect(mapStateTpProps, {
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    signupUser
})(SignupForm);
