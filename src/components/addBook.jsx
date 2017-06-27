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
      titleMsg: '',
      authorMsg: '',
      dateMsg: '',
      coverMsg: ''

    }
    this.title = ''
    this.author = ''
    this.date = ''
    this.cover = ''
    this.saveValues = this.saveValues.bind(this)
    this.close = this.close.bind(this)
    this.titleFlag = true
    this.authorFlag = true
    this.dateFlag = true
    this.coverFlag = true
  }


  handleTitleChange(e) {
    let title = e.target.value
   this.setState({title: title}, function() {
      let reg = /\d/
      if(this.state.title === '' || reg.test(title)) {
        this.titleFlag =false
        this.setState({titleMsg: 'Please fill in correct title - Only letters are accepted'})
      } else {
        this.setState({titleMsg: ''})
        this.titleFlag =true
        this.title = title
      }
   });

  }

  handleAuthorChange(e) {
    let author = e.target.value
   this.setState({author: author}, function() {
     let reg = /\d/
     if(this.state.author === '' || reg.test(author)) {
       this.authorFlag =false
       this.setState({authorMsg: 'Please fill in correct author - Only letters are accepted'})
     } else {
       this.setState({authorMsg: ''})
       this.authorFlag =true
       this.author = author
     }
   });
  }

  handleDateChange(e) {
    let date = e.target.value
   this.setState({date: date}, function() {
     if(this.state.date === '') {
       this.dateFlag =false
       this.setState({dateMsg: 'Please fill in date'})
     } else {
       this.setState({dateMsg: ''})
       this.dateFlag =true
       this.date = date
     }
   });
  }


  handleCoverChange(e) {
    let cover = e.target.value
   this.setState({cover: cover}, function() {
     if(this.state.cover === '') {
       this.coverFlag =false
       this.setState({coverMsg: 'Please add cover image'})
     } else {
       this.setState({coverMsg: ''})
       this.coverFlag =true
       this.cover = cover
     }
   });

  }

  validate(input, type) {
      let reg = /\d/

      if(type === 'title') {
        if(reg.test(input) || input == '') {
          this.titleFlag =false
          this.setState({titleMsg: 'Please fill in correct title'})
        }
        else {
          let val = input.trim().replace(/[^A-Za-z\s]/gi, '')
          if(val !== "") {
            return val[0].toUpperCase() + val.substr(1).toLowerCase();
          }
        }
      }
      if(type === 'author') {
        if(reg.test(input) || input == '') {
          this.authorFlag =false
          this.setState({authorMsg: 'Please fill in correct author'})
        }
        else {
          let val = input.trim().replace(/[^A-Za-z\s]/gi, '')
          if(val !== "") {
            return val[0].toUpperCase() + val.substr(1).toLowerCase();
          }
        }
      }
      if(type === 'url') {
        let validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(input);
        if(!validUrl || input == '') {
          this.coverFlag =false
          this.setState({coverMsg: 'Please fill in correct url'})
        }
        else {
          return input
        }
      }

    if(type === 'date') {
      let today = this.getTodaysDate()
      if(today < input || input < "1900-01-01" || input == '') {
        this.setState({dateMsg: 'Date is incorrect'})
        this.dateFlag = false
      } else{
          return input
      }
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
    let title = this.title
    let author = this.author
    let date = this.date
    let url = this.cover
    let validatedTitle = this.validate(title, 'title')
    let validatedAuthor = this.validate(author, 'author')
    let validatedDate = this.validate(date, 'date')
    let validatedUrl = this.validate(url, 'url')

      this.state.changesInBook = {
        title: validatedTitle,
        author: validatedAuthor,
        date: validatedDate,
        cover: validatedUrl,
        id: this.props.uuid
      }
      this.setState({
        title: '',
        author: '',
        date: '',
        cover: ''
      })

      if(this.titleFlag && this.authorFlag && this.dateFlag && this.coverFlag) {
        this.setState({
          titleMsg: '',
          authorMsg: '',
          dateMsg: '',
          coverMsg: ''
        })
        this.title = ''
        this.author = ''
        this.date = ''
        this.cover = ''
        this.props.onHide()
        var newBook = this.state.changesInBook
        this.props.onAdd(newBook)
      }


  }

  close() {
    this.setState({
      titleMsg: '',
      authorMsg: '',
      dateMsg: '',
      coverMsg: ''
    })
    this.titleFlag = true
    this.authorFlag = true
    this.dateFlag = true
    this.props.onHide()
  }



  render() {
    return (
      <Modal  show={this.props.show} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Create A New Book</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <div className="error-msg"><b>{this.state.titleMsg}</b></div>
          <div className="error-msg"><b>{this.state.authorMsg}</b></div>
          <div className="error-msg"><b>{this.state.dateMsg}</b></div>
          <div className="error-msg"><b>{this.state.coverMsg}</b></div>
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
