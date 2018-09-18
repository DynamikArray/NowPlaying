import React from "react";
import PropTypes from "prop-types";

function sec2time(timeInSeconds) {
  var pad = function(num, size) {
      return ("000" + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return hours
    ? pad(hours, 2) + ":"
    : "" + pad(minutes, 2) + ":" + pad(seconds, 2);
}

export const PlaybackSlider = props => {
  const length = props.length;
  const playback_position = props.playback_position;

  const percent = (playback_position / length) * 100;

  return (
    <div className="d-flex justify-content=start align-items-baseline w-100">
      <div className="align-self-center mx-1">
        <h4 className="m-0">{sec2time(playback_position / 1000)}</h4>
      </div>
      <div className="align-self-baseline mx-1 w-100">
        <input
          className="w-100 slider mt-2"
          type="range"
          min={0}
          max={100}
          value={percent}
          readOnly
        />
      </div>
      <div className="align-self-center mx-1">
        <h4 className="m-0">{sec2time(length / 1000)}</h4>
      </div>
    </div>
  );
};

PlaybackSlider.defaultProps = {
  length: 0,
  playback_position: 0
};

PlaybackSlider.propTypes = {
  length: PropTypes.number,
  playback_position: PropTypes.number
};
