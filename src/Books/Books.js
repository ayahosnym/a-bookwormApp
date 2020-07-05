import React, { Component } from 'react';
import './Books.css';
import Axios from 'axios';

let favBooks = [];
class Books extends Component {
  state = {
    users: [],
    favBookColorHeart: ''
  }

  componentDidMount() {
    Axios.get('http://localhost:3000/users').then(response => {
      this.setState({ users: response.data })
    })
  }
  //this func  to handel when user click on the book to add it to his favorite books 
  // and update his own object on API by adding these books  to display them later in his profile
  // and make update in localstorge too

  handelClickToAddBookToFavBooks = (e, bookId) => {
    const { users } = this.state
    const heartIcon = e.target
    if (heartIcon.style.color === 'gray') {
      heartIcon.style.color = 'red'
    } else
      heartIcon.style.color = 'gray'
    /////////////

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUserEmail = currentUser.email
    const user = users.find(user => user.email === currentUserEmail);

    const userId = user.id
    if (favBooks.includes(bookId)) {
      favBooks = favBooks.filter(id => id !== bookId)
    }
    else {
      favBooks.push(bookId)
    }

    Axios
      .patch('http://localhost:3000/users/' + userId, { favBooks: favBooks })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => console.log(err))
    // console.log(e.target, bookId);

  }

  render() {

    // recive all books  here which I get them from API in home component
    const { books } = this.props
    // display all book by looping 
    const displayImg = books.map((book) => {
      return (
        <div className="col-sm-6  col-md-4 " key={book.id}>
          <figure>
            <img src={book.photoURL} alt='book' />
            <i
              className="fas fa-heart"
              style={{ color: 'gray' }}
              onClick={(e) => this.handelClickToAddBookToFavBooks(e, book.id)} id={book.id}>

            </i>
          </figure>
          <figcaption>
            <h5> {book.title}</h5>
            <p>
              {book.description}
            </p>
            <p>
              عدد الصفحات: {book.pages}
            </p>
            <p>
              سنه النشر: {book.publishYear}
            </p>
            <p>
              {book.authorName}
            </p>
          </figcaption>
        </div >
      )

    })
    return (
      <section className="home bg-white h-100" >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-12 my-5">
              <h3 className='text-center'>
                Book Store
            </h3>
            </div>
            {displayImg}
          </div>
        </div>
      </section >
    );
  }
}

export default Books;