import { useEffect, useState, memo, useMemo, useCallback } from 'react';

import { api } from '../services/api';
import { Button } from './Button';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface FunctionProps{
  handleClickButtons: (id: number) => void;
}

function SideBarComponent(props: FunctionProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useMemo(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
 
  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
    props.handleClickButtons(id);
  }, [])  
  
  return(
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => 
      (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))
      }
    </div>
    
  </nav>
  )
}

export const SideBar = memo(SideBarComponent)