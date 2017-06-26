import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import App from './app.jsx'
import './app.css'


class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      date: '',
      cover: '',
      changesInBook: {},
      errorMsg: ''

    }
    this.saveValues = this.saveValues.bind(this)
    this.close = this.close.bind(this)
  }


  handleTitleChange(e) {
   this.setState({title: e.target.value});
  }
  handleAuthorChange(e) {
   this.setState({author: e.target.value});
  }
  handleDateChange(e) {
   this.setState({date: e.target.value});
  }
  handleCoverChange(e) {
   this.setState({cover: e.target.value});
  }

  validate(input, type) {
    if(type === 'str') {
      let val = input.replace(/[^A-Za-z]/gi, '')
      if(val == "") {
        this.setState({errorMsg: 'Please fill all fields'})
      } else {
        return val[0].toUpperCase() + val.substr(1);
      }

    }
    if(type === 'date') {
      let today = this.getTodaysDate()
      if(today < input || input === '') {
        this.setState({errorMsg: 'Please fill all fields'})
      } else{
          return input
      }

    }

    if(type === 'url' && input == '') {
      this.setState({errorMsg: 'Please fill all fields'})
    } else {
      return input
    }
  }

  getTodaysDate() {
    let current = new Date()
    let day = current.getDate()
    let month = current.getMonth() +1
    if(month < 10) month = '0' + month
    let year = current.getFullYear()
    return year + '-' + month + '-' + day
  }

  saveValues(event){
    let title = this.state.title
    let author = this.state.author
    let date = this.state.date
    let url = this.state.cover
    let validatedTitle = this.validate(title, 'str')
    let validatedAuthor = this.validate(author, 'str')
    let validatedDate = this.validate(date, 'date')
    let validatedUrl = this.validate(url, 'url')

    if(validatedTitle && validatedAuthor && validatedDate && validatedUrl) {
      this.state.changesInBook = {
        title: validatedTitle,
        author: validatedAuthor,
        date: validatedDate,
        cover: validatedUrl,
        id: this.props.uuid
      }
      console.log(this.state.changesInBook);
      this.setState({
        title: '',
        author: '',
        date: '',
        cover: ''
      })
      this.setState({errorMsg: ''})
      this.props.onHide()
      var newBook = this.state.changesInBook
      this.props.onAdd(newBook)
    }


  }

  close() {
    this.setState({errorMsg: ''})
    this.props.onHide()
  }



  render() {
    // console.log(this.props);
    return (
      <Modal  show={this.props.show} onHide={this.props.hide} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Create A New Book</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <div className="error-msg"><b>{this.state.errorMsg}</b></div>
          <form className="searchForm" >
            <div className="input-group">
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="text"
                name="title"
                value={this.props.value}
                placeholder="Book Title"
                onChange={this.handleTitleChange.bind(this)} required />
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="text"
                name="author"
                placeholder="Book Author"
                onChange={this.handleAuthorChange.bind(this)} required />
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="date"
                name="date"
                placeholder="Book Date"
                onChange={this.handleDateChange.bind(this)} required />
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="text"
                name="cover"
                placeholder="Book Cover Image Url"
                onChange={this.handleCoverChange.bind(this)} required />
            </div>


          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.saveValues}>Save</Button>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}



export default AddBook
