import React from 'react'
import './app.css'

import { Button, Modal, ButtonToolbar } from 'react-bootstrap';
import Trigger from './modal'


class Book extends React.Component {

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

    this.getBookChange = this.getBookChange.bind(this)
  }

  changeBook(id) {
    this.setState({
      pressed: id,
      lgShow: true
    })
  }

  getBookChange(change) {
    this.props.updateBook(change)

  }

  removeBook(id) {
    this.props.deleteBook(id)
  }


  render () {
    let lgClose = () => this.setState({ lgShow: false });
    let addClose = () => this.setState({addShow:false});
    // let title = this.props.book.title.substr(0,10)
    return (
      <div className='col-md-3 col-sm-4 col-xs-6' key={this.props.book.id}>
        <div className='book-box' key={this.props.book.id}>
          <Button className='remove-button glyphicon glyphicon-trash' onClick={() => this.removeBook(this.props.book.id)}  />
          <Button className='edit-button glyphicon glyphicon-pencil' onClick={() => this.changeBook(this.props.book.id)}  />
          <Trigger show={this.state.lgShow} onHide={lgClose} book={this.props.book} change={this.getBookChange} />
          <h3 >{this.props.book.title}</h3>
          <img src={this.props.book.cover} alt='' className='cover' />
          <h4>Author: <br/>{this.props.book.author}</h4>
          <div>Date: {this.props.book.date}</div>
        </div>
      </div>
    )
  }
}

export default Book
