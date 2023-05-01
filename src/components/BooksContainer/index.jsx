import React, {useRef, useEffect, useState} from 'react';
import {debounce} from 'lodash-es';
import {Container, H2, BookList} from './styles';
import Book from '../Book';

const BooksContainer = ({books, pickBook, isPanelOpen, title}) => {
  const [scroll, setScroll] = useState(0);
  const prevPanelState = useRef(false);

  //Triggers when isPanelOpen value changes
  //so page doesnt jump back to top, when choosing a book
  //usin lodash library
  useEffect(() => {
    const handleScroll = debounce(() => {
      setScroll(window.scrollY);
    }, 100);

    //if the panel is open its not goint to track scroll position
    if (!isPanelOpen) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPanelOpen]);
  //^useEffect only rins if "isPanelOpen" value changes

  //triggered on 3 different variable
  useEffect(() => {
    if (prevPanelState.current && !isPanelOpen) {
      window.scroll(0, scroll);
    }

    prevPanelState.current = isPanelOpen;
  }, [isPanelOpen, prevPanelState, scroll]);

  return (
    <Container $isPanelOpen={isPanelOpen} $top={scroll}>
      <H2>{title}</H2>
      <BookList>
        {books.map((book) => {
          return <Book key={book.id} book={book} pickBook={pickBook} />;
        })}
      </BookList>
    </Container>
  );
};
export default BooksContainer;
