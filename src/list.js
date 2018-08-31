import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class List extends Component {

  state = {
    display: ""
  }

  openSideBar = (style,state) => {
    this.setState({
      display: true
    })
    console.log(this.state.display)
  }

  closeSideBar = () => {
    this.setState({
      display: false
    })
  }

  render() {
  	const { originData,listData,query,updateQuery} = this.props;
    const { display } = this.state;
    return (
          <div className="search-list" style={{left: display?0:-200}}>
          <div className="menu" onClick={this.openSideBar} style={{visibility: display ? 'hidden':'visible'}}>☰</div>
          {/*{JSON.stringify(query)}*/}
            <div className="close" onClick={this.closeSideBar}>X</div>
              <div className="search-area">
                  <input
                    tabIndex="0"
                    aria-label= "input keyword to search the station"
                    type="text"
                    className="search-input"
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
