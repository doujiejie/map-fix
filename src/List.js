import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class List extends Component {

  state = {
    display: ""
  }

  openSideBar = () => {
    this.setState({
      display: true
    })
  }

  closeSideBar = () => {
    this.setState({
      display: false
    })
  }

  render() {
  	const {listData,query,updateQuery,listClick} = this.props;
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
                    onChange={(event)=>updateQuery(event.target.value,listData)}/>
              </div>
              <div className="list">
                <ol className="list-ol">
                {listData.map((data) => (
                  <li key={data.id} id={data.title.EN} tabIndex="0" onClick={listClick}>
                    <div className="JPN" id={data.title.EN}>{data.title.JPN}</div>
                    <div className="CHN" id={data.title.EN}>(CHN: {data.title.CHN})</div>
                    <div className="EN" id={data.title.EN}>(EN: {data.title.EN})</div>
                  </li>
                  ))}
                </ol>
              </div>
            </div>
            )}}

export default List;
