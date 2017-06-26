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
      errorMsg: ''
    }
    this.id = this.props.book.id
    this.saveValues = this.saveValues.bind(this)

    this.flag = true
  }

  // componentDidMount() {
  //
  // }

  handleTitleChange(e) {
    var title = e.target.value
   this.setState({title: title});
  }
  handleAuthorChange(e) {
   this.setState({author: e.target.value});
  }
  handleDateChange(e) {
   this.setState({date: e.target.value});
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
        this.setState({errorMsg: 'Date is incorrect'})
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
    let title = this.state.title
    let author = this.state.author
    let date = this.state.date
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

    if(!this.flag) {
      setTimeout(function() {
        this.flag = true
        this.setState({errorMsg: ''})
        this.props.onHide()
        var changes = this.state.changesInBook
        changes.id = this.props.book.id

        this.props.change(changes); /////////////////
      }.bind(this),1000)
    }
    else {
      this.props.onHide()
      var changes = this.state.changesInBook
      changes.id = this.props.book.id
      this.props.change(changes); /////////////////
    }

  }

  render() {
    // console.log(this.props.book.date);
    // let props =""
    // let p = this.props
    // console.log(p);
    // let {show, ...rest} = props
    // console.log(props);
    // console.log(this.props);
    return (
      <Modal show={this.props.show}  onHide={this.props.onHide}  bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Change Book Details</Modal.Title>
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
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}



export default Trigger
