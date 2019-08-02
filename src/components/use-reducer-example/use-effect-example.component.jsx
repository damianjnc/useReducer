import React, { useState, useEffect, useReducer } from 'react';

import Card from '../card/card.component';

const INITIAL_STATE = {
  user: null,
  searchQuery: 'Bret'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'SET_SEARCH_QUERY':
      return {...state, searchQuery: action.payload};
    default: return state;
  }
}

const setUser = (user) => ({type: 'SET_USER', payload: user});
const setSearchQuery = (myEvent) => ({type: 'SET_SEARCH_QUERY', payload: myEvent  })

const UseEffectExample = () => {
  const [newState, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
      );
      const resJson = await response.json();
      setUser(resJson[0]);
    };

    fetchFunc();
  }, [searchQuery]);

  return (
    <Card>
      <input
        type='search'
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <h3> {user.username} </h3>
          <h3> {user.email} </h3>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </Card>
  );
};

export default UseEffectExample;
