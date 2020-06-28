import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filtered: [],
      search: "",
      currentPage: 1,
      itemPerPage: 20,
      length: 0,
      sortType: "asc",
      column: "name"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(
        result => {
          const { search } = this.state;
          const filteredData = result.filter(element => {
            return element.name.toLowerCase().includes(search.toLowerCase());
          });
          this.setState({
            isLoaded: true,
            items: filteredData,
            length: filteredData.length
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  handleSort = e => {
    const sortType = this.state.items
      ? this.state.sortType === "asc"
        ? "desc"
        : "asc"
      : "desc";
    const sortedUsers = this.state.items.sort((a, b) => {
      if (this.state.column === "name") {
        const nameA = a.name.toString().toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toString().toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;
        if (nameA < nameB) return 1;
        else return 0;
      } else {
        return a.name - b.name;
      }
    });
    if (sortType === "desc") {
      sortedUsers.reverse();
    }
    this.setState({
      items: sortedUsers,
      column: this.state.column,
      sortType
    });
  };
  handleChange(e) {
    const search = e.target.value;
    this.setState(prevState => {
      const filteredData = this.state.items.filter(element => {
        return element.name
          .toLowerCase()
          .includes(prevState.search.toLowerCase());
      });
      return {
        search,
        items: filteredData
      };
    });
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  handleSingle = item => {
    console.log("Single Data", item);
  };
  previousPage = () => {
    if (this.state.currentPage !== 1)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
  };
  nextPage = () => {
    if (this.state.currentPage + 1 < this.state.length)
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };
  render() {
    const { error, isLoaded, items, itemPerPage, currentPage } = this.state;
    // Start Page Number Display
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className="page-item" key={number}>
          <a id={number}
            className="page-link"
            href="# "
            onClick={this.handleClick}
          >
            {number}
          </a>
        </li>
      );
    });
    // End Page Number Display

    // Start Display Table Data
    const indexOfLastTodo = currentPage * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTableData = currentTodos
      .map((item, index) => {
        return (
          <tr key={item.name}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.body}</td>
            <td>
              <button
                type="button"
                onClick={() => this.handleSingle(item)}
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
        );
      });
    // End Display Table Data

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-9">{this.state.search}</div>
            <div className="col-sm-3 text-right">
              <input
                type="text"
                value={this.state.search ? this.state.search : ""}
                className="form-control"
                placeholder="Search"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-sm-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th onClick={this.handleSort} scope="col">
                      Name{" "}
                      <a href="# " value="name">
                        <i className="fa fa-fw fa-sort"></i>
                      </a>
                    </th>
                    <th onClick={this.handleSort} scope="col">
                      Email{" "}
                      <a href="# " value="email">
                        <i className="fa fa-fw fa-sort"></i>
                      </a>
                    </th>
                    <th onClick={this.handleSort} scope="col">
                      Body{" "}
                      <a href="# " value="body">
                        <i className="fa fa-fw fa-sort"></i>
                      </a>
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{renderTableData}</tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination" id="page-numbers">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="# "
                      onClick={this.previousPage}
                    >
                      Previous
                    </a>
                  </li>
                  {renderPageNumbers}
                  <li className="page-item">
                    <a className="page-link" href="# " onClick={this.nextPage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Table;
