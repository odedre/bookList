import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import './app.css'


class Trigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      date: '',
      changesInBook: {},
      id: '',
      titleMsg: '',
      authorMsg: '',
      dateMsg: ''
    }
    this.title = ''
    this.author = ''
    this.date = ''
    this.id = this.props.book.id
    this.saveValues = this.saveValues.bind(this)
    this.close = this.close.bind(this)
    this.titleFlag = true
    this.authorFlag = true
    this.dateFlag = true
  }


  handleTitleChange(e) {
    let title = e.target.value
   this.setState({title: title}, function() {
      if(this.state.title === '') {
        this.titleFlag =false
        this.setState({titleMsg: 'Please fill in title'})
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
     if(this.state.author === '') {
       this.authorFlag =false
       this.setState({authorMsg: 'Please fill in author'})
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

  validate(input, type) {
    if(type === 'str') {
      let val = input.trim().replace(/[^A-Za-z\s]/gi, '')
      if(val !== "") {
        return val[0].toUpperCase() + val.substr(1).toLowerCase();
      }

    }
    if(type === 'date' && input != '') {
      let today = this.getTodaysDate()
      if(today < input) {
        this.setState({dateMsg: 'Date is incorrect'})
        this.flag = false
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
    let validatedTitle = this.validate(title, 'str')
    let validatedAuthor = this.validate(author, 'str')
    let validatedDate = this.validate(date, 'date')

    this.state.changesInBook = {
      title: validatedTitle,
      author: validatedAuthor,
      date: validatedDate
    }

    this.setState({
      title: '',
      author: '',
      date: ''
    })



    if(this.titleFlag && this.authorFlag && this.dateFlag) {
      this.setState({
        titleMsg: '',
        authorMsg: '',
        dateMsg: ''
      })
      this.props.onHide()
      var changes = this.state.changesInBook
      changes.id = this.props.book.id
      this.props.change(changes); 
    }

  }

  close() {
    this.setState({
      titleMsg: '',
      authorMsg: '',
      dateMsg: ''
    })
    this.titleFlag = true
    this.authorFlag = true
    this.dateFlag = true
    this.props.onHide()
  }

  render() {

    return (
      <Modal show={this.props.show}  onHide={this.props.onHide}  bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Change Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="error-msg"><b>{this.state.titleMsg}</b></div>
          <div className="error-msg"><b>{this.state.authorMsg}</b></div>
          <div className="error-msg"><b>{this.state.dateMsg}</b></div>
          <form className="searchForm" >
            <div className="input-group">
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="text"
                name="title"
                defaultValue={this.props.book.title}
                placeholder="Change book Title"
                onChange={this.handleTitleChange.bind(this)} />
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="text"
                name="author"
                defaultValue={this.props.book.author}
                placeholder="Change book Author"
                onChange={this.handleAuthorChange.bind(this)} />
              <input
                className="form-control modal-input"
                id="searchBooks"
                type="date"
                name="date"
                defaultValue={this.props.book.date}
                placeholder="Change book Date"
                onChange={this.handleDateChange.bind(this)} />
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



export default Trigger
