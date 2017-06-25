import React from 'react'
import axios from 'axios'
import './app.css'
import Search from './search'
import AddBook from './addBook'
import Trigger from './modal'
import BookList from './bookList'
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';


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

    this.addBook = this.addBook.bind(this)
  }

  componentDidMount() {

    var that = this

    var booksJson = axios.get('https://raw.githubusercontent.com/odedre/jsonHost/master/books.json').then(function(data) {
      return data.data.books
    }).then(function(res) {
      that.setState({
        bookArray: res
      })
    })

  }

  addBook(newBook) {
    var newArr = this.state.bookArray;
    newArr.unshift(newBook)
    this.setState({bookArray: newArr})
  }

  updateSearch(event) {
    var change = event.target.value
    this.setState({
    }, function() {
      search: change
    });
  }



  render () {
    let books = this.state.bookArray.filter(
      (bookName) => {
        return bookName.title.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
      }
    )

    let addClose = () => this.setState({addShow:false});
    var bookArrayLength = this.state.bookArray.length + 1;

    return (
      <div>
          <div id="top">
            <Search className="search"  onChange={this.updateSearch.bind(this)}/>
            <div className='add-button '>
              <Button  bsStyle="primary" onClick={()=>this.setState({ addShow: true })}>Add Book</Button>
              <AddBook show={this.state.addShow} onHide={addClose} onAdd={this.addBook} length={bookArrayLength} />
            </div>
          </div>

        <BookList data={books}/>
      </div>
    )
  }
}

export default App
