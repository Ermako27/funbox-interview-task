import React, { Component } from 'react';

class Ymap extends Component {
    constructor({ymap}) {
        super();
        // console.log(this);
        this.ymap = ymap;
    }

    state = {
        center: [55.76, 37.64],
        zoom: 7
    }

    componentDidMount() {
        this.ymap.ready(() => {
            this.mapInstance = new this.ymap.Map('map', this.state);
        });
    }

    render() {
        return (
            <div id='map' style={{width: '600px', height: '400px'}}></div>
        )
    }
}

export default Ymap;