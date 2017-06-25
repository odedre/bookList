// import React from 'react'
// import './app.css'
// import Books from '../data/books.json'
// import Search from './search'
// // import Modal from './modal'
// import Trigger from './modal'
// import { Button, Modal, ButtonToolbar } from 'react-bootstrap';
//
//
//
// class App extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       lgShow: false,
//       bookArray: [],
//       changes: ''
//     }
//   }
//
//   componentDidMount() {
//     this.setState({
//       bookArray: Books.books
//     })
//   }
//
//   changeBook(book, id) {
//     let newArray = []
//     console.log("sdasdsafsaf", book, id)
//     console.log("sdafasdfasdgadfghadfgkjashfdgljagsdlgasdf",id);
//     console.log(this.state.changes);
//
//     if(this.state.changes) {
//       newArray = this.state.booksArray;
//       newArray[id-1] = this.state.changes;
//     } else newArray = this.state.booksArray;
//     this.setState({
//       lgShow: true,
//       bookArray:  newArray
//     })
//   }
//
//
//   render () {
//     var books = this.state.bookArray
//     console.log(books)
//     console.log(this.state.bookArray['3']);
//     let lgClose = () => this.setState({ lgShow: false });
//
//     return (
//       <div>
//
//         <Search />
//         <div className='row'>
//
//           {books.map(function (book) {
//             // console.log(book)
//             return (
//               <div className='col-md-3 col-sm-4 col-xs-6' key={book.id}>
//                 <div className='book-box' key={book.id}>
//                   <Button className='edit-button glyphicon glyphicon-pencil' onClick={() => this.changeBook(book, book.id)} />
//                   <Trigger show={this.state.lgShow} onHide={lgClose} />
//                   <h2 >{book.title}</h2>
//                   <img src={book.cover} alt='' className='cover' />
//                   <h4>Author: {book.author}</h4>
//                   <div>Date: {book.date}</div>
//                 </div>
//               </div>
//             )
//           }.bind(this))}
//
//         </div>
//       </div>
//     )
//   }
// }
//
// export default App
