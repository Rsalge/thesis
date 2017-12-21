import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import SearchResult from './SearchResult'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (

           <div id="search-results" style={{backgroundColor: 'red', display: 'flex', flexDirection: 'column', width: '50%', height: '100%'}} >
             <div id="searchresult1" style={{backgroundColor: 'aqua', display: 'flex', flexDirection: 'row', width: '100%', height: '10%'}}>
               <Label id="track-header" style={{width: '60%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: '#575159'}}>Track</Label>
               <Label id="artist-header" style={{width: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: '#575159'}}>Artist</Label>
               <Label id="album-header" style={{width: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: '#575159'}}>Album</Label>
             </div>
             {this.props.searchResults.map((result, index) => (<SearchResult result={result} />))}  
           </div>
    )
  }
}

export default SearchResults;
