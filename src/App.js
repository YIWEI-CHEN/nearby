import React, { Component } from 'react';
import Modal from "./components/Modal";
import VideojsRecordPlayer from "./components/VideojsRecordPlayer";
import axios from "axios";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

const videoJsOptions = {
    controls: true,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
        /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            src: 'live',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true
        },
        */
        record: {
            audio: true,
            video: true,
            maxLength: 10,
            debug: true
        }
    }
};


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

class App extends Component {

constructor(props){
    super(props);
    this.state={
      users:[],
      isLoaded:false
    }
  }

  componentDidMount() {
    const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios.get('/read_profiles/')
    .then(function (response) {
      _this.setState({
        users:response,
        isLoaded:true
      });
    })
    .catch(function (error) {
      console.log(error);
      _this.setState({
        isLoaded:false,
        error:error
      })
    })
      console.log( _this.state )
  }




  // displayCompleted = status => {
  //   if (status) {
  //     return this.setState({ viewCompleted: true });
  //   }
  //   return this.setState({ viewCompleted: false });
  // };
  // renderTabList = () => {
  //   return (
  //     <div className="my-5 tab-list">
  //       <span
  //         onClick={() => this.displayCompleted(true)}
  //         className={this.state.viewCompleted ? "active" : ""}
  //       >
  //         complete
  //       </span>
  //       <span
  //         onClick={() => this.displayCompleted(false)}
  //         className={this.state.viewCompleted ? "" : "active"}
  //       >
  //         Incomplete
  //       </span>
  //     </div>
  //   );
  // };
  // renderItems = () => {
  //   const { viewCompleted } = this.state;
  //   const newItems = this.state.todoList.filter(
  //     item => item.completed === viewCompleted
  //   );
  //   return newItems.map(item => (
  //     <li
  //       key={item.id}
  //       className="list-group-item d-flex justify-content-between align-items-center"
  //     >
  //       <span
  //         className={`todo-title mr-2 ${
  //           this.state.viewCompleted ? "completed-todo" : ""
  //         }`}
  //         title={item.description}
  //       >
  //         {item.title}
  //       </span>
  //       <span>
  //         <button
  //           onClick={() => this.editItem(item)}
  //           className="btn btn-secondary mr-2"
  //         >
  //           {" "}
  //           Edit{" "}
  //         </button>
  //         <button
  //           onClick={() => this.handleDelete(item)}
  //           className="btn btn-danger"
  //         >
  //           Delete{" "}
  //         </button>
  //       </span>
  //     </li>
  //   ));
  // };
  // toggle = () => {
  //   this.setState({ modal: !this.state.modal });
  // };
  // handleSubmit = item => {
  //   this.toggle();
  //   if (item.id) {
  //     axios
  //       .put(`/api/todos/${item.id}/`, item)
  //       .then(res => this.refreshList());
  //     return;
  //   }
  //   axios
  //     .post("/api/todos/", item)
  //     .then(res => this.refreshList());
  // };
  // handleDelete = item => {
  //   axios
  //     .delete(`/api/todos/${item.id}`)
  //     .then(res => this.refreshList());
  // };
  // createItem = () => {
  //   const item = { title: "", description: "", completed: false };
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };
  // editItem = item => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };
  render() {
    return (

      // <main className="content">
        // <h1 className="text-white text-uppercase text-center my-4">Check-in app</h1>
        // <VideojsRecordPlayer { ...videoJsOptions } />
        // <div className="row ">
          // <div className="col-md-6 col-sm-10 mx-auto p-0">
            // <div className="card p-3">
              // <div className="">
                // <button onClick={this.createItem} className="btn btn-primary">
                  // Add task
                // </button>
              // </div>
              // {this.renderTabList()}
              // <ul className="list-group list-group-flush">
                // {this.renderItems()}
              // </ul>
            // </div>
          // </div>
        // </div>
        // {this.state.modal ? (
          // <Modal
            // activeItem={this.state.activeItem}
            // toggle={this.toggle}
            // onSave={this.handleSubmit}
          // />
        // ) : null}
      // </main>

      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>


    );
  }
}
export default App;