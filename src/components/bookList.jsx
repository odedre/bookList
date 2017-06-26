import React from 'react'
import axios from 'axios'
import './app.css'
import Search from './search'
import AddBook from './addBook'
import Trigger from './modal'
import Book from './book'
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';


class BookList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      addShow: false,
      lgShow: false,
      bookArray: [],
      changes: '',
      pressed: 0,
      search: '',
      newBook: this.props.data
    }

    this.updateChanges = this.updateChanges.bind(this)
    this.removeBook = this.removeBook.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentWillReceiveProps() {

    this.setState({
    },function() {
      this.setState({bookArray: this.props.data})
    })
  }



  removeBook(id) {
    var bookArr = this.state.bookArray;
    var newArr = bookArr.filter(function(book) {
      return book.id != id;
    })
    if(confirm('are you sure you want to remove this book?')) {
      this.setState({bookArray: newArr}, function() {
        this.setState({bookArray: newArr})
      })
    }
    this.props.change(newArr)
  }

  updateChanges(change) {
    if(change) {
      var id = change.id
      var array = this.state.bookArray
      array.map(function(book) {
        if(book.id == id) {
          if(change.author) {
            book.author = change.author
          }
          if(change.date) {
            book.date = change.date
          }
          if(change.title) {
            book.title = change.title
          }
        }
      })
      this.setState({
        bookArray: array
      })
    }
  }

  // updateSearch(event) {
  //   this.setState({
  //     search: event.target.value.substr(0, 10)
  //   });
  // }

  updateSearch(event) {
    var change = event
    this.setState({
    }, function() {
      this.setState({search: change})
    });
  }

  render () {

    let books = this.state.bookArray.filter(
      (bookName) => {
        return bookName.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    let lgClose = () => this.setState({ lgShow: false });
    let addClose = () => this.setState({addShow:false});
    var bookArrayLength = this.state.bookArray.length + 1;
    return (
      <div>
        <Search className="search"  change={this.updateSearch} value={this.state.search}/>

        <div className='row'>
          {books.map(function (book) {
            return (
              <Book book={book} key={book.id} updateBook={this.updateChanges} deleteBook={this.removeBook}/>
            )
          }.bind(this))}
        </div>
      </div>
    )
  }
}

export default BookList
