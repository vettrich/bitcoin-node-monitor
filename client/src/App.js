import React, { Component } from 'react';
import fetch from 'node-fetch';
import bytes from 'bytes';
import ms from 'ms';

import fetchLocal from './fetchLocal';
import logo from './bitcoinLogo.svg';
import './style/App.css';
import './style/font-awesome.css';

const blockCountUrl = "http://blockchain.info/q/getblockcount";

const handleEmpty = function(check, valueFunction = null) {
  if (check === null || typeof check === "undefined") {
    return (
      <i className="fa fa-spinner fa-pulse fa-fw" aria-hidden="true" />
    );
  }

  return valueFunction !== null? valueFunction(): check;
};

class App extends Component {
  state = {
    system: {},
    info: {},
    blocksTotal: null
  };

  componentDidMount() {
    const fetchNodeData = () => {
      fetchLocal('/info')
        .then(response => response.json())
        .then(data => this.setState({
          info: data
        }))
        .catch(error => {
          console.log(error);
        });
      };

    const fetchSystemData = () => {
      fetchLocal('/system')
        .then(response => response.json())
        .then(data => this.setState({
          system: data
        }))
        .catch(error => {
          console.log(error);
        });
    };

    const fetchBlockCountData = () => {
      fetch(blockCountUrl)
        .then(response => response.text())
        .then(response => {
          console.log(response);
          this.setState({
            blocksTotal: parseInt(response)
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    setInterval(fetchNodeData, ms('2m'));
    setInterval(fetchSystemData, ms('10s'));
    setInterval(fetchBlockCountData, ms('2m'));
    fetchNodeData();
    fetchSystemData();
    fetchBlockCountData();
  }

  render() {
    return (
      <div className="App">
        <section className="header">
          <img src={logo} className="App-logo" alt="logo" />
        </section>
        <h1>Info</h1>
        <section className="row">
          <div className="col">Blocks:</div>
          <div className="col">
            <span>{handleEmpty(this.state.info.blocks)}</span> / <span>{handleEmpty(this.state.blocksTotal)}</span>
          </div>
        </section>
        <section className="row">
          <div className="col">Memory used:</div>
          <div className="col">
            <span>{handleEmpty(bytes(this.state.system.memoryUsed))}</span> / <span>{handleEmpty(bytes(this.state.system.memoryTotal))}</span>
          </div>
        </section>
        <section className="row">
          <div className="col">CPU used:</div>
          <div className="col">
            <span>{handleEmpty(this.state.system.cpuUsed, () => this.state.system.cpuUsed.toFixed(1))}</span><span>%</span>
          </div>
        </section>
        <section className="row">
          <div className="col">Disk used:</div>
          <div className="col">
            <span>{handleEmpty(bytes(this.state.system.diskUsed))}</span> / <span>{handleEmpty(bytes(this.state.system.diskTotal))}</span>
          </div>
        </section>
        {/*{this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}*/}
      </div>
    );
  }
}

export default App;
