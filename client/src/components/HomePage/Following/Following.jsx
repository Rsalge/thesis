/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Icon, Label, Popup } from 'semantic-ui-react';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      hovering: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveFollow = this.handleRemoveFollow.bind(this, this.props.follow.spotifyId);
    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);

  }
  handleClick() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  handleRemoveFollow(spotifyId) { // eslint-disable-line
    axios.delete(`/api/removeFollow?removeSpotifyId=${spotifyId}`)
      .then((following) => {
        this.props.getFollowing(this.props.spotiyId);
      })
      .catch((err) => {
        throw err;
      })
  }

  onItemMouseEnter() {
    this.setState({
      hovering: true
    });
  }

  onItemMouseLeave() {
    this.setState({
      hovering: false
    })
  }

  handleTrackClick() {
    axios({
      method: 'put',
      url: '/api/spotifyAPI/playSong',
      data: {
        uris: [`spotify:track:${this.props.follow.currentMySong.trackID}`],
      },
    })
      .then(() => {
        this.props.playFollowingTrack(this.props.follow.currentMySong.trackID);
      })
      .catch(err => { // eslint-disable-line
        console.error(err);
        this.props.playFollowingTrack(this.props.follow.currentMySong.trackID);
      });
  }

  render() {
    var color = this.state.hovering ? 'white' : 'black';

    return (
      <div style={{ margin: 'none' }}>
        <Label id="following-label">
          {this.props.follow.mySongUsername}
          <Popup
            trigger={
              (this.props.view === 'following' &&
                <Icon
                style={{ display: 'inline-block', float: 'right' }}
                size="large"
                onClick={this.handleRemoveFollow}
                name="close"
              />) ||

              (this.props.view === 'playlist' &&
                <Icon
                style={{ display: 'inline-block', float: 'right' }}
                color={color}
                size="large"
                onClick={()=>this.props.newPlaylistHandleClick(this.props.follow)}
                onMouseEnter={this.onItemMouseEnter}
                onMouseLeave={this.onItemMouseLeave}
                name="add circle"
              />)


      
            }
            content={this.props.view === 'following' && `Stop following ${this.props.follow.mySongUsername}` || this.props.view === 'playlist' && `Add ${this.props.follow.mySongUsername}'s MySong to playlist`  }
            position="top center"
          />
        </Label>
        <Label style={{ display: 'flex', order: '0', borderRadius: '0px', width: '100%', textAlign: 'center', marginLeft: 0 }}>
          {this.props.follow.currentMySong.trackName}
          <Popup
            trigger={
              <Icon
                style={{ order: '-2', padding: '0px 1px 0px 0px' }}
                size="large"
                onClick={this.handleTrackClick}
                name="play circle"
              />
            }
            content={`Play ${this.props.follow.mySongUsername}'s MySong`}
            position="left center"
          />
          <Popup
            trigger={
              <Icon
                style={{ display: 'flex', order: '-1', justifyContent: 'flex-end' }}
                size="large"
                onClick={this.handleClick}
                name="book"
              />
            }
            content={`Show/Hide ${this.props.follow.mySongUsername}'s MySong note`}
            position="top center"
          />
        </Label>
        {this.state.isVisible &&
          (
            <div>
              <Label
                style={{ display: 'inline-block', borderRadius: '0px', width: '100%', textAlign: 'center' }}
              >
                {this.props.follow.currentMySong.note}
              </Label>
            </div>
          )
        }
      </div>
    );
  }
}

export default Following;
