import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import PreviewList from "./PreviewList";
import FilterSelect from "./FilterSelect";
import Genre from "../schema/Genre";

import Movie from "../schema/Movie";
import Series from "../schema/Series";
import Search from "./Search";

// dynamically load the modal to reduce bundle size
const DetailModal = dynamic(() => import("./DetailModal"));

type MediaType = {
  id: number;
  name: string;
}

const mediaTypes: MediaType[] = [
  {
    id: 0,
    name: 'tv'
  },
  {
    id: 1,
    name: 'movie'
  }
];

// Used to hydrate the modal on load
const emptyItem: Movie = {
  "video": false,
  "vote_average": 0,
  "overview": "",
  "release_date": "",
  "vote_count": 0,
  "adult": false,
  "backdrop_path": "",
  "id": 0,
  "genre_ids": [],
  "title": "",
  "original_language": "",
  "original_title": "",
  "poster_path": "",
  "popularity": 0,
  "media_type": ""
};

export default function FilteredPreviewList(props: {}){
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [genreFilters, setGenreFilters] = useState<Genre[]>([]);
  const [fullList, setFullList] = useState<(Movie | Series)[]>([]);
  const [movies, setMovies] = useState<(Movie | Series)[]>([]);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType[]>([...mediaTypes]);
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Movie | Series>(emptyItem);

  const filterByGenre = (list: (Movie | Series)[], genres: Genre[]): (Movie | Series)[] => {
    if (genres.length === 0) return list;
    const filterIds = genres.map((g) => g.id);
    const filteredList = list.filter((item) => {
      for (let i = 0; i < item.genre_ids.length; i++) {
        if (filterIds.indexOf(item.genre_ids[i]) > -1) {
          return true;
        }
      }
    })
    return filteredList;
  }

  const filterByType = (list: (Movie | Series)[], types: MediaType[]): (Movie | Series)[] => {
    if (types.length === 0) return list;
    const typeNames = types.map((t) => t.name);
    const filteredList = list.filter((item) => {
      return typeNames.indexOf(item.media_type) > -1
    })
    return filteredList;
  }

  // Lifecycle
  useEffect(() => {
    setMovies(() => {
      const list = filterByGenre(fullList, genreFilters);
      return filterByType(list, mediaTypeFilter);
    })
  }, [genreFilters, mediaTypeFilter, fullList])

  useEffect(() => {
    let shouldCancel = false;
    async function getMovies() {
      try {
        const data = await fetch('/api/trending');
        const jsonData = await data.json()
        if (shouldCancel) return;
        setFullList(jsonData.results);
        setMovies(jsonData.results);
      }
      catch (error) {
        throw error;
      }
    }
    async function getGenres() {
      try {
        const data = await fetch('/api/genres');
        const jsonData = await data.json()
        if (shouldCancel) return;
        setAllGenres(jsonData.genres);
      }
      catch (error) {
        throw error;
      }
    }
    getMovies();
    getGenres();
    return () => {shouldCancel = true} // Avoids memory leak in case component is unmounted while fetching
  }, [])

  return (
    <div className='px-20 py-10'>
      <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1">
        <Search 
          items={movies} 
          setSelectedItem={setSelectedItem}
          setOpen={setModalOpen}
          className='col-span-1 sm:col-span-2 row-start-1 sm:row-start-1 col-start-1 sm:pr-5 mt-3 ' 
          />
        <FilterSelect
          selected={mediaTypeFilter}
          setSelected={setMediaTypeFilter}
          placeholder='Select one or more types'
          className='col-span-1 row-start-2 sm:row-start-1 lg:col-end-[-2] sm:pr-5 mt-3'
          label='Filter by Type'
          multiple
          list={mediaTypes}
        />
        <FilterSelect
          selected={genreFilters}
          setSelected={setGenreFilters}
          placeholder='Select one or more genres'
          className='col-span-1 row-start-3 sm:row-start-1 lg:lg:col-end-[-1] mt-3'
          label='Filter by Genre'
          multiple
          list={allGenres}
        />

      </div>
      <PreviewList items={movies} setSelectedItem={setSelectedItem} setOpen={setModalOpen} />
      <DetailModal open={modalOpen} setOpen={setModalOpen} item={selectedItem} />
    </div>
  )
}
