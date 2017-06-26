import React from 'react'
import axios from 'axios'
import './app.css'
// import Search from './search'
import AddBook from './addBook'
import Trigger from './modal'
import BookList from './bookList'
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';

var counter = 12

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      addShow: false,
      lgShow: false,
      bookArray: [],
      changes: '',
      pressed: 0,
      search: ''
    }

    this.books = null

    this.addBook = this.addBook.bind(this)
    this.checkIfBooksChanged = this.checkIfBooksChanged.bind(this)
  }

  componentDidMount() {

    var booksJson = axios.get('https://raw.githubusercontent.com/odedre/jsonHost/master/books.json')
      .then(function(data) {
        return data.data.books
        }).then(function(res) {
        this.setState({
          bookArray: res
        })
    }.bind(this))
  }

  checkIfBooksChanged(newArray) {
    this.books = newArray
  }

  addBook(newBook) {
    if(this.books === null) this.books = this.state.bookArray
    this.books.unshift(newBook)
    this.setState({bookArray: this.books})
  }

  render () {
    if(this.books === null) {
        var newArr = this.state.bookArray;
    }
    else {
      var newArr = this.books
    }
    let books = newArr.filter(
      (bookName) => {
        return bookName.title.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
      }
    )
    let addClose = () => this.setState({addShow:false});

    return (
      <div>
          <div id="top">

            <div className='add-button '>
              <Button  bsStyle="primary" onClick={()=>this.setState({ addShow: true })}>Add Book</Button>
              <AddBook show={this.state.addShow} onHide={addClose} onAdd={this.addBook} uuid={++counter} />
            </div>
          </div>

        <BookList data={books} change={this.checkIfBooksChanged}/>
      </div>
    )
  }
}

export default App
