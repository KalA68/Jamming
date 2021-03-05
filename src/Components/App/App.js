import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{name:'name1', artist: 'artist1', album: 'album1', id:1}, 
      {name:'name2', artist: 'artist2', album: 'album2', id:2}, 
      {name:'name3', artist: 'artist3', album: 'album3', id:3}],
      playlistName: "My first Play List",
      playlistTracks:[{name:'PLname1', artist: 'artist1', album: 'album1', id:1},
      {name:'PLname2', artist: 'artist2', album: 'album2', id:2},
      {name:'PLname3', artist: 'artist3', album: 'album3', id:3},]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

    addTrack(track) {
      if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
        } else {this.setState(this.state.playlistTracks.push(track))}

    }

    removeTrack(track) {
      let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
      this.setState({playlistTracks: tracks});

    }

    updatePlaylistName(newName) {
      this.setState({
        playlistName: newName
      })
    }

    savePlaylist() {
      const trackUris = this.state.playlistTracks.map(track => track.uri);

      Spotify.savePlaylist(this.state.PlaylistName, trackUris).then(
        () => {
        this.setState({playlistName:'New Playlist',
                      playlistTracks: []
                    });
                  });
    }
  

    search(term) {
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults});
      })
    }

    render() {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults ={this.state.searchResults} 
                          onAdd={this.addTrack} />

          <Playlist  playlistName = {this.state.playlistName} 
                      playlistTracks = {this.state.playlistTracks}
                      onRemove = {this.removeTrack}
                      onNameChange = {this.updatePlaylistName}
                      onSave = {this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }

    
}

export default App;