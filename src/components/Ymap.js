import React, { Component } from 'react';

class Ymap extends Component {
    constructor({ymap}) {
        super();
        this.ymap = ymap;
    }

    state = {
        center: [55.76, 37.64],
        zoom: 7,
        mapInstance: null,
        placeMarkArray: [],
        maxPlaceMarkAmount: 5,
    };

    componentDidMount() {
        this.ymap.ready(() => {
            this.state.mapInstance = new this.ymap.Map('map', {center: this.state.center, zoom: this.state.zoom}, { searchControlProvider: 'yandex#search'});
            this.addPlaceMarkListener();
        });
    }

    addPlaceMarkListener() {
        this.state.mapInstance.events.add('click', (e) => {
            const coords = e.get('coords');

            if (this.state.placeMarkArray.length < this.state.maxPlaceMarkAmount) {
                const placeMark = this.createPlacemark(coords);
                this.state.mapInstance.geoObjects.add(placeMark);
                // Слушаем событие окончания перетаскивания на метке.
                placeMark.events.add('dragend', () => {
                    this.getAddress(placeMark, placeMark.geometry.getCoordinates());
                });
                this.getAddress(placeMark, coords);
                this.state.placeMarkArray.push(placeMark);
                console.log(this.state.placeMarkArray.length);
            }
        });
    }

    createPlacemark(coords) {
        const placeMark = new this.ymap.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
        return placeMark;
    }


    getAddress(placeMark, coords) {
        console.log('get adress',placeMark);
        placeMark.properties.set('iconCaption', 'поиск...');
        this.ymap.geocode(coords).then( (res) => {
            const firstGeoObject = res.geoObjects.get(0);

            placeMark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }

    render() {
        return (
            <div id='map' style={{width: '600px', height: '300px'}}>
            
            </div>
        )
    }
}

export default Ymap;