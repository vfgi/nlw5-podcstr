import { createContext, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffleing: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    togglePlay: () => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    play: (episode: Episode) => void;
    toggleLoop: () => void; 
    toggleShuffle: () => void;
    clearPlayerState: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffleing, setIsShuffleing] = useState(false);
  
    function play(episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: [], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
      setIsLooping(!isLooping)
    }

    function toggleShuffle() {
      setIsShuffleing(!isShuffleing)
    }
  
    function setPlayingState(state: boolean) {
      setIsPlaying(state)
    }

    function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffleing || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {
      if (isShuffleing) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      } else if (hasNext) {       
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }
    }

    function playPrevious() {
      if (hasPrevious) {       
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
    }
  
    return (
        <PlayerContext.Provider 
          value={{ 
            play, 
            togglePlay, 
            playNext,
            playPrevious,
            setPlayingState,
            playList, 
            toggleLoop,
            toggleShuffle,
            clearPlayerState,
            isPlaying,
            isLooping,
            isShuffleing,
            hasNext,
            hasPrevious,
            episodeList, 
            currentEpisodeIndex
            }}
          >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}