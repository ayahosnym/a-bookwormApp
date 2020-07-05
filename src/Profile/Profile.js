import React, { Component } from 'react';
import './Profile.css';
import UserFormSettingInfo from '../UserFormSettingInfo/UserFormSettingInfo';
import Axios from 'axios';
import { Link } from 'react-router-dom';


const currentUser = JSON.parse(localStorage.getItem('currentUser'))
let favBooksId = []
class Profile extends Component {
  state = {
    users: [],
    books: [],
    isBooksVisable: false,
    isSettingVisable: false

  }
  componentDidMount() {
    Axios.get('http://localhost:3000/users').then(response => {
      this.setState({ users: response.data })
    })
    Axios.get('http://localhost:3000/books').then(response => {
      this.setState({ books: response.data })
    })
  }

  showMyFavBooks = () => {
    const { isBooksVisable } = this.state
    this.setState({
      isBooksVisable: !isBooksVisable
    })
  }
  displayBooks = (e) => {
    const { users, books } = this.state
    const user = users.find(user => user.email === currentUser.email)
    const arrayHaveFavBooksId = user.favBooks
    let arrayHaveObjOfuserFavBooks = [];
    for (let book of books) {
      for (let bookId of arrayHaveFavBooksId) {
        if (bookId === book.id) {
          arrayHaveObjOfuserFavBooks.push(book)
        }
      }
    }
    const displayBooks = arrayHaveObjOfuserFavBooks.map((book, id) => {
      return (
        <div>
          <figure key={id}>
            <img src={book.photoURL} alt='book' />
          </figure>
          <figcaption>
            <h5> {book.title}</h5>
            <p>
              {book.authorName}
            </p>
            <span onClick={(e) => this.removeBookFromFav(e, id)} className="text-danger">remove</span>
          </figcaption>
        </div>
      )
    })
    return displayBooks
  }

  removeBookFromFav = (e, id) => {
    //get user who logging in and to get his id and favbooks array
    // i didn't get this data from localstorge cuz i didn't send favbook in the object in localstorge 
    const { users } = this.state
    const user = users.find(user => user.email === currentUser.email)
    const userId = user.id
    favBooksId = user.favBooks
    // get index for the book id to remove it from array by splice 
    let index = favBooksId.indexOf(id)
    favBooksId.splice(index, 1)
    // I remove the book then i update the object for the user in API 
    Axios
      .patch('http://localhost:3000/users/' + userId, { favBooks: favBooksId })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => console.log(err))

    // by this line I remove the book immediatly without refresh 
    e.target.parentNode.parentNode.remove()

  }
  showUserSettings = (e) => {
    const { isSettingVisable } = this.state
    this.setState({ isSettingVisable: !isSettingVisable })
    console.log(e.target);

  }
  render() {
    const { isBooksVisable, isSettingVisable } = this.state
    return (
      <section className="profile">
        <div className='container-fluid'>
          <div className='row'>
            <div className="col-sm-12 col-md-3">
              <h4 className='py-5 ' onClick={this.showUserSettings}>
                Settings
                <i className="fas fa-cog px-5 " style={{ fontSize: 15 }}></i>
              </h4>
              {isSettingVisable ? <UserFormSettingInfo /> : null}
            </div>
            <div className=" col-sm-12 col-md-8 user-fav-books">
              <p onClick={this.showMyFavBooks} className="text-center py-5"> show my Books</p>
              <div className='d-flex'>
                {isBooksVisable ? this.displayBooks() :
                  <p>Your don't have favorite books yet ! go to
                  <Link to='/home'>  Home  </Link>
                   to add 
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </section >
    );

  }
}
export default Profile;