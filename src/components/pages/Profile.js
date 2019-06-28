/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { getUserProfile, updateProfile } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image, 
    TextInput,
    Platform,
    ToastAndroid, 
    Dimensions,
    ScrollView
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Helpers from '../../lib/helpers';
import Avatar from '../../img/avatar.png';

const ITEM_WIDTH = Dimensions.get('window').width;

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('images').child(imageName);
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            username: '',
            accountType: '',
            bandName: '',
            bandMembers: '',
            bandDescription: '',
            bandImageUrl: '', 
            linkToSample: ''    
        };
    }

    async componentDidMount() {
        this.props.getUserProfile();
    }

    componentWillReceiveProps(nextProps) {
        const { id, username, accountType, bandName, bandMembers,
            bandDescription, bandImageUrl, linkToSample } = nextProps.profile;
        this.setState({
            id,
            username,
            accountType,
            bandName,
            bandMembers,
            bandDescription,
            bandImageUrl, 
            linkToSample 
        });
    }

    openImagePicker() {
        const options = {
            title: '¡Agrega tu avatar!',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User canceled image Picker');
            } else if (response.error) {
                console.log('Error' + response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button' + response.customButton);
            } else {
                this.setState({ 
                    imagePath: response.uri,
                    imageHeight: response.height,
                    imageWidth: response.width
                });
            }
        });
    }

    saveForm() {
        const { id, username, accountType, bandName, bandMembers, bandDescription,
            bandImageUrl, linkToSample } = this.state;
        const profile = {
            id, 
            username, 
            accountType, 
            bandName, 
            bandMembers, 
            bandDescription,
            bandImageUrl, 
            linkToSample  
        };
        this.props.updateProfile(profile);
    }

    renderAvatar() {
        if (this.props.avatar !== '') {
            return (<Image 
                style={{ width: 100, height: 100, borderRadius: 150 / 2 }}
                source={{ uri: this.props.avatar }}
            />);
        } 
        return (<Image 
            style={{ width: 100, height: 100, borderRadius: 150 / 2 }}
            source={Avatar}
        />); 
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
                <TouchableOpacity
                    onPress={this.openImagePicker.bind(this)}
                    style={{ marginBottom: 40, marginTop: 20 }}
                >
                    <View style={{ alignItems: 'center' }}>
                        {this.renderAvatar()}
                        <Text style={{ color: 'white' }}>Avatar </Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='nombres'
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='tipo de cuenta'
                    value={this.state.accountType}
                    onChangeText={(accountType) => this.setState({ accountType })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='Nombre de la banda'
                    value={this.state.bandName}
                    onChangeText={(bandName) => this.setState({ bandName })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='Miembros de la banda'
                    value={this.state.bandMembers}
                    onChangeText={(bandMembers) => this.setState({ bandMembers })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='url imagen de la banda'
                    value={this.state.bandImageUrl}
                    onChangeText={(bandImageUrl) => this.setState({ bandImageUrl })}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textInput}
                    placeholder='ingresa link a demo'
                    value={this.state.linkToSample}
                    onChangeText={(linkToSample) => this.setState({ linkToSample })}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    selectionColor="#fff"
                    placeholderTextColor="#ffffff"
                    autoCorrect={false} //we disable the autocorrect from ios or android
                    style={styles.textArea}
                    placeholder='Ingresa la descripción de tu banda'
                    value={this.state.bandDescription}
                    onChangeText={(bandDescription) => this.setState({ bandDescription })}
                />

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.saveForm.bind(this)}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#0277BD',
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cecece',
        marginBottom: 20,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginHorizontal: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#ffffff',
        width: ITEM_WIDTH - 100,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingVertical: 10,
        width: 100,
        backgroundColor: '#2D09A1',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    textArea: {
        height: 150,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#cecece',
        marginBottom: 20,
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#ffffff',
        width: ITEM_WIDTH - 100,
    }
});

const mapStateToProps = state => {
    const { profile } = state.userForm;

    return { profile };
};


export default connect(mapStateToProps, { getUserProfile, updateProfile })(Profile);
