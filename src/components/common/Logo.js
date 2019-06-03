import React from 'react';
import { Image, View, Text } from 'react-native';
import HeadHuntersLogo from '../../img/HeadHuntersLogo.png';

const Logo = ({ title }) => {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 250, height: 180 }}
                source={HeadHuntersLogo}
            />
            <Text style={styles.logoText}>{title}</Text>
        </View> 
    );
};

const styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)'
    }
};

export { Logo };

