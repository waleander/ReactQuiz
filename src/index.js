import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash';


const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn', 'The Adventures of Tom Sawyer', 'The Innocents Abroad', 'The Gilded Age: A Tale of Today']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness', 'Lord Jim', 'The Secret Agent', 'The Nigger of the Narcissus']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT', 'The other Half']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = _.shuffle(allBooks).slice(0, 4);
  const answer = _.sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) =>
        title === answer))
  }
}

function resetState () {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

let state = resetState();

function onAnswerSelected (answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer)
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App () {
  return <AuthorQuiz { ...state } 
    onAnswerSelected={ onAnswerSelected }
    onContinue={ ()=> {
      state = resetState();
      render();
    }}
     />;
}

const AuthorWrapper = withRouter(({ history }) => 
   <AddAuthorForm onAddAuthorForm={ (author) => {
    authors.push(author);
    history.push('/');
    } } />

)


function render () {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={ App }></Route>
        <Route path="/add" component={ AuthorWrapper }></Route>
      </React.Fragment>   
    </BrowserRouter>, document.getElementById('root'));
}


render();

registerServiceWorker();
