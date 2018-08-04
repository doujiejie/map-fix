import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class List extends Component {

  render() {

  	const { originData,listData,query,updateQuery } = this.props;


    // console.log(originData[0].title.EN);



    return (
          <div className="search-list">
          {JSON.stringify(query)}
              <div className="search-area">
                  <input 
                    type="text" 
                    className="serach-input" 
                    value={ query } 
                    placeholder="search (example : tokyo)"
                    onChange={(event)=>updateQuery(event.target.value,originData)}/>
                  <button className="search-btn">Search
                  </button>
              </div>
              <div className="list">
                <ol className="list-ol">
                  {listData.map((data) => (
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
