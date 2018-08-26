import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class List extends Component {

  render() {
  	const { originData,listData,query,updateQuery} = this.props;
    return (
          <div className="search-list">
          {/*{JSON.stringify(query)}*/}
              <div className="search-area">
                  <input
                    tabIndex="0"
                    type="text"
                    className="serach-input" 
                    value={ query } 
                    placeholder="Search station (for example : tokyo)"
                    onChange={(event)=>updateQuery(event.target.value,originData)}/>
              </div>
              <div className="list">
              {!query && (
                <ol className="list-ol">
                {originData.map((data) => (
                  <li key={data.id} tabIndex="0">
                    <div className="JPN">{data.title.JPN}</div>
                    <div className="CHN">(CHN: {data.title.CHN})</div>
                    <div className="EN">(EN: {data.title.EN})</div>
                  </li>
                  ))}
                </ol>
              )}
              {query && (
                <ol className="list-ol">
                {listData.map((data) => (
                  <li key={data.id} tabIndex="0">
                    <div className="JPN">{data.title.JPN}</div>
                    <div className="CHN">(CHN: {data.title.CHN})</div>
                    <div className="EN">(EN: {data.title.EN})</div>
                  </li>
                  ))}
                </ol>
              )}
              </div>
            </div>
            )}}

export default List;
