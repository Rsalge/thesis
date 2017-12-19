import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import axios from 'axios'

class CreatePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPlaylistName: '',
      newPlaylist: [],
      followObjectArray: [],
      open: false,
      noPlaylistNameError: false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false,
      name: 'Bob'
    };

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  // componentWillUpdate() {
  //   this.setState({noPlaylistNameError :false});
  //   this.setState({noSongsInPlaylistError: false});
  //   this.setState({playlistNameAlreadyExistsError: false});
  // }
  //state = { open: false }

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value});
    console.log('new playlist name is ', this.state.newPlaylistName);
  }

  handleSave() {
    var userPlaylists = this.props.playlists.map((playlist) => playlist.playlistName);
    var illegalChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    this.setState({playlistNameAlreadyExistsError: false});
    this.setState({illegalCharError: false});
    //Error Handling
    if (this.state.newPlaylistName === '' && this.state.newPlaylist.length === 0) {
      this.setState({noPlaylistNameError :true});
      this.setState({noSongsInPlaylistError: true});
      this.setState({playlistNameAlreadyExistsError: false});
      return;
    }

    if (this.state.newPlaylist.length === 0) {
      this.setState({noSongsInPlaylistError: true});
      this.setState({noPlaylistNameError :false});
      this.setState({playlistNameAlreadyExistsError: false});
      return;
    }

    if (this.state.newPlaylistName === '') {
      this.setState({noPlaylistNameError :true});
      this.setState({noSongsInPlaylistError: false});
      this.setState({playlistNameAlreadyExistsError: false});
      return;
    }

    if (illegalChars.test(this.state.newPlaylistName) == true) {
      this.setState({illegalCharError: true});
      return;
    }

    if (userPlaylists.includes(this.state.newPlaylistName)) {
      this.setState({playlistNameAlreadyExistsError: true});
      this.setState({noPlaylistNameError :false});
      this.setState({noSongsInPlaylistError: false});
      return;
    }


    if (this.state.newPlaylist.length !== 0 && this.state.newPlaylistName !== '' && (!userPlaylists.includes(this.state.newPlaylistName))) {
      this.setState({noPlaylistNameError :false});
      this.setState({noSongsInPlaylistError: false});
      this.setState({playlistNameAlreadyExistsError: false});
      var newPlaylist = {
         "playlistName" : this.state.newPlaylistName,
         "spotifyPlaylistID" : "testForNow",
         "spotifyPlaylistURI" : "testForNow",
         "songsArrayBySpotifyUserID" : this.state.newPlaylist
      }

      var newPlaylistPayload = {
        newPlaylist: newPlaylist,
        spotifyId: this.props.spotifyId
      }

      axios.post('/api/aplaylist', newPlaylistPayload)
        .then((results) => {
           this.setState({newPlaylistName: ''});
           this.setState({newPlaylist: []});
           this.props.updatePlaylists(newPlaylist);
        })
        .catch((err) => {
          throw err;
        });
    }


    this.setState({open:false});
  }

  handleCancel() {
    this.setState({newPlaylistName: ''});
    this.setState({newPlaylist: []});
    this.setState({open:false});

    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    this.setState({playlistNameAlreadyExistsError: false});
    this.setState({illegalCharError: false});
  }



  newPlaylistHandleClick(follow) {
    // var songsArray = this.state.newPlaylist;
    // if (!songsArray.includes(follow.spotifyId)) {
    //   songsArray.push(follow.spotifyId);
    //   this.setState({newPlaylist: songsArray})
    // }  else {
    //   var index = songsArray.indexOf(follow.spotifyId);
    //   songsArray.splice(index, 1);
    //   this.setState({newPlaylist: songsArray});
    // }
    console.log('follow is', follow);
    var followObjectArray = this.state.followObjectArray;
    followObjectArray.push(follow);
    this.setState({followObjectArray: followObjectArray});
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (

      <div>
        <Button color='red' onClick={this.show(true)}>Create</Button>
        <Modal dimmer={true} open={open} onClose={this.close}>
          <Modal.Header>Create a Playlist</Modal.Header>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
            <div style={{padding: '20px 20px', flexGrow: '1'}}>
            <FollowingContainer
                spotifyId={this.props.spotifyId}
                newPlaylistHandleClick = {this.newPlaylistHandleClick}
                following={this.props.following}
                refreshFollowing={this.props.refreshFollowing}
                view={this.props.view}
              /> 
            </div>
            <div style={{flexGrow: '2', display: 'flex', flexDirection: 'column', alignItems: 'stretch', maxWidth: '50%'}}>

              
                <div style={{flexGrow: '1', padding: '0px 0px 10px 0px'}}>
                <Input onChange={this.handlePlaylistNameChange} style={{fontSize: '20px'}} focus placeholder='Playlist Name' />
                </div>
                <div style={{flexGrow: '4', height: '100%'}}>
                  {this.state.followObjectArray.map((result, index) => (
                   <div style={{fontSize: '40px', wordWrap: 'break-word'}}>
                   <Icon name="circle" />
                   {result.currentMySong.trackSummary}
                   </div>
                 ))}
                </div>
          

              



                

            </div>
          </div>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel} content="Cancel"/>
            <Button positive icon='checkmark' labelPosition='right' content="Save" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default CreatePlaylistModal
