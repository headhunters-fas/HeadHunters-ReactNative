import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Input } from '.';

export class SignForm extends Component {

    baseForm = (view) => {
        return (
            <View>
                <CardSection>
                    <Input 
                        type='email-address'
                        label="Email"
                        placeholder="email@gmail.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={this.props.Email}
                        value={this.props.email}
                    />
                </CardSection>
                {this.props.EmailError}
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="contraseña"
                        onChangeText={this.props.Password}
                        value={this.props.password}
                    />
                </CardSection>    
                {view}
            </View>
        ); 
    }

    loginForm = () => {
        return (
            this.baseForm()
        );
    }

    signUpForm = () => {
        return (
            this.baseForm(
                <View>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="reescribir contraseña"
                            onChangeText={this.props.ConfirmPassword}
                            value={this.props.confirmPassord}
                        />
                    </CardSection>   
                </View>
            )
        );
    }

    render() {
        return this.props.ConfirmPassword === undefined ? this.loginForm() : this.signUpForm();
    }
}

export const styles = {
    errorTextStyle: {
        fontSize: 15,
        color: 'red'
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 2,
        marginTop: 0
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 10,
        flexDirection: 'row'
    },
    singupText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16
    },
    singupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    }
};
