import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';
import { Link } from 'react-router-dom'



function Hero() {
  return (
    <div className="row container-fluid">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
        <Link to="/add">Add new author</Link>
      </div>
    </div>
  )
}
function Book({title, onClick}) {
  return(
    <div className="answer" onClick={ () => onClick(title) }>
      <h1>{title}</h1>
    </div>
  );
}

function Turn ({ author, books, highlight, onAnswerSelected }) {
  
  function hightlightToBgColor (highlight) {
     const mapping = {
       'none': '',
       'correct': 'green',
       'wrong': 'red'
     };
     return mapping[highlight];
  }

  return (
    <div className="row turn container offset-1" style={{ backgroundColor: hightlightToBgColor(highlight) }}>
      <div className="col-4 ">
        <img src={author.imageUrl} className="authorImage" alt="author" />
      </div>

      <div className="col-6 books">
        {books.map((title) => <Book title={title} key={title} onClick={ onAnswerSelected }/>)}
      </div>
    </div>
  )
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func,
  highlight: PropTypes.string.isRequired
}

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {
        show
         ? <div className="col-11">
            <button className="btn btn-primary btn-lg float-right" onClick={ onContinue }>Continue</button>
           </div>
        : null
      }
    </div>
  )
}

function Footer() {
  return (
    <div className="row" id="footer" style={{ background: 'purple', color: 'yellow' }}>
      <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="http://commons.wikimedia.org/"> Wikimedia Commons</a> and are in the public domain
          </p>
      </div>
    </div>
  )
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected, onContinue }) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn { ...turnData } highlight={ highlight } onAnswerSelected={ onAnswerSelected } />
        <Continue show={ highlight === 'correct' } onContinue={ onContinue }/>
        
        <Footer />
      </div>
    );
}

export default AuthorQuiz;
