import './App.css';
import Header from './components/Header/Header';
import React, { useState, useEffect, useMemo } from "react";
import Main from './components/Main/Main';
import Game from './components/Game/Game';
import Select from './components/UI/Select/Select';
import Search from './components/UI/Search/Search';
import Loader from './components/UI/Loader/Loader';
import api from './utils/api';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [cardsApi, setCardsApi] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [nextPage, setNextPage] = useState('');

  // Карточки с сервера
  useEffect(() => {
    setIsCardsLoading(true)
    api.getGames()
      .then((response) => {
        setCardsApi([...response.results]);
        setNextPage(response.next)
        setIsCardsLoading(false);
      })
      .catch((err) => {
        console.log(`Невозможно отобразить карточки с сервера ${err}`);
      })
  }, [])

  useEffect(() => {
    setCards([...cardsApi])
  }, [cardsApi]);

  // Пагинация (бесконечный скролл) 
  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return function () {
      document.removeEventListener('scroll', handleScroll);
    }
  }, []);

  function handleScroll(e) {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  useEffect(() => {
    if (fetching) {
      setIsCardsLoading(true)
      api.getNextPage(nextPage)
        .then((response) => {
          if (response.next) {
            setCardsApi([...cardsApi, ...response.results]);
            setNextPage(response.next);
            setFetching(false);
            setIsCardsLoading(false);
          }
        })
        .catch((err) => {
          console.log(`Невозможно отобразить карточки с сервера ${err}`);
        })
        .finally(() => {
          setIsCardsLoading(false);
        })
    }
  }, [fetching]);

  // Поиск по названию
  const sortedAndSearchedCards = useMemo(() => {
    return cards.filter(card => card.name.toLowerCase().includes(searchQuery))
  }, [searchQuery, cards])

  // Сортировка по рейтингу и дате релиза игры (в обе стороны)
  function sortCards(sort) {
    setSelectedSort(sort);
    if (sort == 'По убыванию рейтинга') {
      setCards([...cards].sort((a, b) => b.rating - a.rating));
    } else if (sort == 'По возрастанию рейтинга') {
      setCards([...cards].sort((a, b) => a.rating - b.rating));
    } else if (sort == 'По убыванию даты релиза') {
      setCards([...cards].sort((a, b) => new Date(b.released) - new Date(a.released)));
    } else {
      setCards([...cards].sort((a, b) => new Date(a.released) - new Date(b.released)));
    }
  }

  // Фильтрация по платформам
  function filterCards(filter) {
    setSelectedFilter(filter);
    if (filter == 'All') return setCards([...cardsApi]);
    setCards([...cardsApi].filter(a => a.platforms.some(b => b.platform.name == filter)));
  }

  return (
    <div className="App">
      <Header />
      <div className="functions">
        <Select
          onChange={sortCards}
          value={selectedSort}
          defaultValue='Сортировка по'
          options={[
            { value: 'rating', name: 'По возрастанию рейтинга' },
            { value: 'rating', name: 'По убыванию рейтинга' },
            { value: 'released', name: 'По возрастанию даты релиза' },
            { value: 'released', name: 'По убыванию даты релиза' },
          ]}
        />
        <Select
          onChange={filterCards}
          value={selectedFilter}
          defaultValue='Platforms'
          options={[
            { value: 'All', name: 'All' },
            { value: 'PC', name: 'PC' },
            { value: 'PlayStation 5', name: 'PlayStation 5' },
            { value: 'Xbox One', name: 'Xbox One' },
            { value: 'PlayStation 4', name: 'PlayStation 4' },
            { value: 'Xbox Series S/X', name: 'Xbox Series S/X' },
          ]}
        />
        <Search
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Main cards={sortedAndSearchedCards} />} />
        <Route path="/:id" element={<Game cards={sortedAndSearchedCards} />} />
      </Routes>

      {isCardsLoading &&
        <div className="loader-container"><Loader /></div>
      }
    </div>
  );
}

export default App;
