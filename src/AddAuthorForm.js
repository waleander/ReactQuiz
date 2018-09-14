import React from 'react';
import "./AddAuthorForm.css";


class AuthorForm extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
          name: '',
          imageUrl: '',
          books: [],
          bookTemp: ''
      };
      this.onFieldChange = this.onFieldChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange (event)  {
       this.setState({
           [event.target.name]: event.target.value
       });
    }

    handleAddBook (event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    render() {
       return(
        <form onSubmit={ this.handleSubmit }>
        <div className="AddAuthorForm__input">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={ this.state.name } onChange={ this.onFieldChange } />
        </div>

        <div className="AddAuthorForm__input">
            <label htmlFor="name">Image URL</label>
            <input type="input" name="imageUrl" alt="author_image" value={ this.state.imageUrl } onChange={ this.onFieldChange }/>
        </div>

        <div className="AddAuthorForm__input">
            <label htmlFor="bookTemp">Books</label>
            { this.state.books.map((book) => <p key= {book }>{ book }</p>) }
            <input type="input" name="bookTemp" value={ this.state.bookTemp } onChange={ this.onFieldChange } />
            <input type="button" value="+" onClick={ this.handleAddBook } />

        </div>
        <input type="submit"  name="Add" />
    </form>
       )

    }
}

function AddAuthorForm ({ match, onAddAuthorForm }) {
    return <div className="AddAuthorForm">
      <h1>Add Author </h1>
      <AuthorForm onAddAuthor={ onAddAuthorForm } />
    </div>
  }

  export default AddAuthorForm;