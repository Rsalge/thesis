import React from 'react';
import axios from 'axios';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import PlaylistContainer from './Playlists/PlaylistContainer';
import MainContainer from './Main/MainContainer';
import FollowingContainer from './Following/FollowingContainer';
import BottomPlayer from './BottomPlayer';
import NavBarContainer from '../NavBar/NavBarContainer';
import MyCurrentSongContainer from './MyCurrentSong/MyCurrentSongContainer';



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      spotifyDisplayName: '',
      spotifyId: null,
      spotifyRefreshToken: '',
      spotifyToken:'',
      spotifyUsername:'',
      currentPlaylist: null,
      currentMySong:'Tiny Dancer by Elton John'
    };
    this.handleMySongChange = this.handleMySongChange.bind(this);
  }

  componentWillMount() {
    const token = window.location.href.split('=')[1]; // eslint-disable-line
    window.localStorage.token = token; // eslint-disable-line
    axios.defaults.headers.common.jwt = window.localStorage.token; // eslint-disable-line
    if (window.localStorage.token) { // eslint-disable-line
      axios.get('/api/me')
        .then((res) => {
          this.setState({
            spotifyDisplayName: res.data.spotifyDisplayName,
            spotifyId: res.data.spotifyId,
            spotifyRefreshToken: res.data.spotifyRefreshToken,
            spotifyToken:res.data.spotifyToken,
            spotifyUsername:res.data.spotifyUsername
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handlePlaylistEntryClick(playlistID) {
    console.log('handlePlaylistEntryClick', 'input:', playlistID);
    this.setState({
      currentPlaylist: playlistID,
    });
  }

  handleFollowingClick() {
    console.log('HANDLE FOLLOWING CLICK');

  handleMySongChange(mySong) {
    this.setState({ currentMySong: mySong });
  }

  render() {
    return (
      <div>
        <NavBarContainer username={this.state.spotifyUsername} />
        <Container style={{ marginTop: '3em', width: '100%' }}>
          <Header as="h1" style={{ textAlign: 'center' }}>
            Current My Song is : {this.state.currentMySong}
            <MyCurrentSongContainer onMySongChange={this.handleMySongChange}/>
          </Header>
          <Divider />
          <Grid columns={3} stackable>
            <Grid.Column>
              <PlaylistContainer clickHandler={this.handlePlaylistEntryClick.bind(this)} />
            </Grid.Column>

            <Grid.Column>
              <Header as="h1">Current Playlist: {this.state.currentPlaylist}</Header>
              <MainContainer />
            </Grid.Column>

            <Grid.Column>
              {this.state.spotifyId && ( <FollowingContainer
                spotifyId={this.state.spotifyId}
              /> ) }
            </Grid.Column>

          </Grid>
          <BottomPlayer />
        </Container>
      </div>
    );
  }
}

export default HomePage;
