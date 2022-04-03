import './App.css';
import React, { useState, useEffect } from "react";
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Select from './components/UI/Select/Select'
import Search from './components/UI/Search/Search'
import api from './utils/api';

function App() {

  const [cards, setCards] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getGames()
      .then((cardsArray) => {
        setCards([...cardsArray.results]);
        console.log(cards)
      })
      .catch((err) => {
        console.log(`Невозможно отобразить карточки с сервера ${err}`);
      })
  }, [])

  function sortPosts(sort) {
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

  return (
    <div className="App">
        <Header />
        <Select 
          onChange = {sortPosts}
          value = {selectedSort}
          defaultValue = 'Сортировка по'
          options = {[
            {value: 'rating', name: 'По возрастанию рейтинга'},
            {value: 'rating', name: 'По убыванию рейтинга'},
            {value: 'released', name: 'По возрастанию даты релиза'},
            {value: 'released', name: 'По убыванию даты релиза'},
          ]}
        />
        <Search 
          value = {searchQuery}
          onChange = {e => setSearchQuery(e.target.value)}
        />
        <Main 
          cards = {cards}
        />
    </div>
  );
}

export default App;
