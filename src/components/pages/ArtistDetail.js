import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Linking  } from 'react-native';
import { CardSection, Card } from '../common';
import { styles } from '../common/AlbumStyles';
import { colors } from 'react-native-elements';

class ArtistDetail extends Component {

    render() {
        const { bandName, bandMembers, bandDescription, 
            bandImageUrl, linkToSample } = this.props.Item;
        const { headerContentStyle, thumbnailStyle, thumbnailContainerStyle,
            headerTextStyle, imageStyle } = styles;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#0277BD' }}>
                <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
                    <Card>
                        <CardSection>
                            <View style={thumbnailContainerStyle}>
                                <Image style={thumbnailStyle} source={{ uri: bandImageUrl }} />
                            </View>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{bandName}</Text>
                                <Text>{bandMembers} </Text>
                            </View>
                        </CardSection>

                        <CardSection>
                            <Image style={imageStyle} source={{ uri: bandImageUrl }} />
                        </CardSection>
                        <CardSection>
                            <Text>{bandDescription} </Text>
                        </CardSection>
                        <CardSection>
                            <Text 
                            style={{ color: 'blue' }} 
                            onPress={() => Linking.openURL(linkToSample)}>
                            {linkToSample} 
                            </Text>
                        </CardSection>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

export default ArtistDetail;

