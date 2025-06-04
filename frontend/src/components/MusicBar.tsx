import { useEffect, useState } from "react";
import song from "/background_song.mp3";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MusicBar = () => {
  const [audio] = useState(() => {
    const newAudio = new Audio(song);
    newAudio.loop = true;
    newAudio.volume = 0.5;
    return newAudio;
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <Button
      sx={{ position: "absolute" }}
      size="small"
      onClick={handlePlayPause}
    >
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </Button>
  );
};

export default MusicBar;
