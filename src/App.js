import React, { Component } from 'react';
import 'babel-polyfill';


class App extends Component {

    async componentDidMount() {
        fetch('https://api-maps.yandex.ru/2.1/?apikey=<6fd3a924-5d43-43b6-b93b-f1cf9bb3e236>&lang=ru_RU')
            .then( response => {
                // const json = response.json();
                console.log(window.ymaps)
                response.json()
                    .then( data => {
                        console.log('DATA', data);
                    })
                console.log('RESPONSE', response);
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <span>Hellow World</span>
            </div>
        )
    }
}

export default App;