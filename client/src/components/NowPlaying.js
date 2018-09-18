import React, { Component } from "react";

import axios from "axios";

import { PlaybackSlider } from "./PlaybackSlider";

class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getNowPlaying = this.getNowPlaying.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.getNowPlaying();
    }, 1000);
  }

  renderCoverArt() {
    if (this.state.currently_playing_type === "ad") return false;
    const item = this.state.item;
    if (item) {
      const album = item.album;
      if (album) {
        const images = album.images;
        if (images) {
          return (
            <img
              src={images[1].url}
              className="img img-fluid"
              alt={album.name}
            />
          );
        }
      }
    }
    return false;
  }

  renderPlayBackPosition() {
    if (this.state.currently_playing_type === "ad") return false;
    if (!this.state.is_playing) return false;

    const length = this.state.item.duration_ms;
    const playback_position = this.state.progress_ms;

    if (length && playback_position) {
      return (
        <PlaybackSlider
          className="w-100"
          length={length}
          playback_position={playback_position}
        />
      );
    }
    return false;
  }

  renderTrackTitle() {
    if (this.state.currently_playing_type === "ad") return false;
    const item = this.state.item;
    if (item) {
      if (item.name) {
        return (
          <span>
            <span className="fieldWrapper mx-1">{item.name}</span>from
          </span>
        );
      }
    }
    return false;
  }

  renderArtistsName() {
    if (this.state.currently_playing_type === "ad") return false;
    const item = this.state.item;

    const artists = ((item || {}).album || {}).artists;
    if (artists) {
      if (artists[0].name) {
        return (
          <span>
            <span className="fieldWrapper mx-1">{artists[0].name}</span> with
          </span>
        );
      }
    }
    return false;
  }

  renderAlbumName() {
    if (this.state.currently_playing_type === "ad") return false;
    const item = this.state.item;

    const album = ((item || {}).album || {}).name;
    if (album) {
      return <span className="fieldWrapper mx-1">{album}</span>;
    }
    return false;
  }

  render() {
    const adPlaying = this.state.currently_playing_type === "ad";
    return (
      <div id="nowPlayingWrapper" style={{ width: "1400px", height: "300px" }}>
        <div className="d-flex flex-row align-items-end">
          <div className="d-flex flex-column align-self-center coverArt">
            {this.renderCoverArt()}
          </div>
          <div
            style={{
              width: "1100px"
            }}
            className="d-flex flex-column align-self-end bg-dark p-3 mt-auto border"
          >
            <div className="align-self-center text-center w-100 ">
              {adPlaying ? false : this.renderArtistsName()}
              {adPlaying ? false : this.renderTrackTitle()}

              {adPlaying ? false : this.renderAlbumName()}
            </div>
            <div className="align-self-center text-center w-100">
              {this.renderPlayBackPosition()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  async getNowPlaying() {
    await axios
      .get(`/spotify/${this.props.match.params.userId}/player`)
      .then(response => {
        const data = response.data;
        if (data) this.setState({ ...data });
      })
      .catch(err => console.log(err));
  }
}

export default NowPlaying;
