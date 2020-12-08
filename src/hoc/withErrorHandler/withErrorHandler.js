import React, { Component, Fragment } from "react";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      // axios.interceptors.request.use(req => {
      //     this.setState({error: null});
      //     return req;
      // });
      // axios.interceptors.response.use(res => res, error => {
      //     this.setState({error: error});
      // });

    //   axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
    //   axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
    //   axios.defaults.headers.post["Content-Type"] = "application/json";

      axios.interceptors.request.use(
        (request) => {
          console.log(request);
          // Edit request config
          return request;
        },
        (error) => {
          console.log(error);
          alert(`Request ${error}`);
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => {
          console.log(response);
          // Edit request config
          return response;
        },
        (error) => {
          alert(`Response ${error}`);
          console.log(error);
          return Promise.reject(error);
        }
      );
    }

    render() {
      return (
        <Fragment>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
