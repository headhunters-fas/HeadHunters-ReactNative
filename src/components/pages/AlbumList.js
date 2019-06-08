import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import AlbumSum from './AlbumSum';

let DEMO_TOKEN;

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      loading: true,
      genre: '',
      albumsT: [],
    };
  }
 
  async componentDidMount() {
    DEMO_TOKEN = await AsyncStorage.getItem('id_token');
    const { genre } = this.props; 
    if (genre !== '') {
      Actions.refresh({ title: genre });
    }
    
    axios.get(`http://10.0.2.2:8080/api/albums?genre=${genre}`, {
      headers: {
        Authorization: DEMO_TOKEN //the token is a variable which holds the token
      }
    })
    .then(response => this.setState({ albums: response.data, loading: false }));
  }

  async componentWillReceiveProps(nextProps) {
    DEMO_TOKEN = await AsyncStorage.getItem('id_token');
    if (this.state.genre !== nextProps.genre) {
      axios.get(`http://10.0.2.2:8080/api/albums?genre=${nextProps.genre}`, {
      headers: {
        Authorization: DEMO_TOKEN //the token is a variable which holds the token
      }
      })
      .then(response => this.setState({ albums: response.data, loading: false }));

      Actions.refresh({ title: nextProps.genre });
    }
    this.setState({ genre: nextProps.genre });
  }

  renderAlbums() {
    return this.state.albums.map(album =>
       <AlbumSum key={album.title} albumData={album} />
    );
  }

  render() {
    console.log(this.state.albums);
    if (this.state.loading) {
      return (
        <View style={styles.viewStyle}>
          <Spinner color={'white'} size={37} type={'Circle'} />
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#0277BD' }}>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#0277BD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = ({ albums }) => {
  const { genre } = albums;

  return { genre };
};

export default connect(mapStateToProps, null)(AlbumList);
