import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }

    this.updateSearch = this.updateSearch.bind(this)
  }


  updateSearch(event) {
    var input = event.target.value

    this.setState({
      search: input
      }
    );
  }


  render() {
    return (
      <form className="searchForm">
        <div className="input-group">
          <input
            className="form-control"
            id="searchBooks"
            type="text"
            placeholder="Search for a book"
            value={this.state.search}
            onChange={this.updateSearch} />
        </div>
      </form>
    )
  }
}

export default Search;
