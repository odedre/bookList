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
    }, function() {
      this.setState({search: input})
      });
      this.props.change(input)
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
            onChange={this.updateSearch.bind(this)} />
        </div>
      </form>
    )
  }
}

export default Search;
