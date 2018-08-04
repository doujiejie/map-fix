import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class List extends Component {
    state = {
    	query: ""
    }
  render() {

  	const { positionData } = this.props;
  	const { query } = this.state;

    return (
          <div className="search-list">
              <div className="search-area">
                  <input type="text" className="serach-input" value="" placeholder="search (example : tokyo)"/>
                  <button className="search-btn">Search
                  </button>
              </div>
              <div className="list">
                <ol className="list-ol">
                  {positionData.map((data) => (
                    <li key={data.id}>
                     <div className="JPN">{data.title.JPN}</div>
                     <div className="CHN">(CHN: {data.title.CHN})</div>
                     <div className="EN">(EN: {data.title.EN})</div>
                    </li>
                    ))}
                </ol>
              </div>
            </div>
    )
  }
}

export default List;
