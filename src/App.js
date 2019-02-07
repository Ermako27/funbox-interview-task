import React, { Component } from 'react';
import 'babel-polyfill';

import Ymap from './components/Ymap.js';


class App extends Component {
    state = {
        successFetch: false,
        fetching: true,
        ymap: null
    };

    componentWillMount() {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');

        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=<6fd3a924-5d43-43b6-b93b-f1cf9bb3e236>&lang=ru_RU';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
            this.setState({
                successFetch: true,
                fetching: false,
                ymap: window.ymaps
            });
        }

        script.onerror = () => {
            this.setState({
                successFetch: false,
                fetching: false
            })
        } 
        

        head.appendChild(script);
    }
    componentDidMount() {


        fetch('https://api-maps.yandex.ru/2.1/?apikey=<6fd3a924-5d43-43b6-b93b-f1cf9bb3e236>&lang=ru_RU')

            .then( response => {
                console.log(window.ymaps);
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <span>Hello World</span>
                {this.state.fetching && <span>Идет загрузка карты</span>}
                {this.state.successFetch && <Ymap ymap={this.state.ymap}/>}
            </div>
        )
    }
}

export default App;