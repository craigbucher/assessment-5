import axios from 'axios'


const Test = () => {
    console.log('APITest loaded')

    //////// Generic test - modify below ///////
    axios.post('/inspections/', { appuser: 4, curr_hive: 14, inspection_date: '2022-10-10', temperature: 77.2, humidity: 44, pollen_type: null, pollen_count: null, queen_sight: true, brood: null, queen_cells: null, has_swarmed: false, supers: null, feeding: null, disease: null, meds: null, notes: 'Notes for a test post from the test page' }).then((response) => {
        // axios.post('/hives/', { nickname: 'API Test', loc_lat: 41.3412, install_date: '2022-10-10', location_name: '', loc_long: null, frames: 10, depth: '', active: true, breed: 'Italian', removal_date: null, photo_url: null, notes: 'Notes for a test post from the test page' }).then((response) => {
        console.log(response.headers.date)
        // console.log(response.headers.location)
        console.log(response.statusText)
        console.log(response.status)
        console.log('response ==', response)
    })

    // axios.delete('/hives/12').then((response) => {
    //     console.log(response.headers.date)
    //     console.log(response.statusText)
    //     console.log(response.status)
    //     console.log('response ==', response)
    // })

    //////////// Test location API //////////////
    // axios.get('/location').then((response) => {
    //     console.log('response =', response)
    //     let latitude = response.data.latitude;
    //     let longitude = response.data.longitude;
    //     let city = response.data.city;
    //     let state = response.data.region_iso_code;
    //     console.log(latitude, longitude, city, state)
    // })

    //////////// Test weather API //////////////
    // axios.get('/weather', { params: { latitude: '41.5852', longitude: '-87.8059' } }).then((response) => {
    //     console.log('response =', response)
    //     let temperature = response.data.main.temp;
    //     let humidity = response.data.main.humidity;
    //     console.log('Temperature: ' + temperature + 'ºF, Humidity: ' + humidity + '%')
    // })

    //////////// Test pollen API //////////////
    // axios.get('/pollen', { params: { latitude: '41.5852', longitude: '-87.8059' } }).then((response) => {
    //     console.log('response =', response)
    //     let pollen = response.data.data[0].Count
    //     // let pollen = response.data.data[0].Species // more specific?
    //     let pollenText = `Tree pollen: ${pollen.tree_pollen}, Grass pollen: ${pollen.grass_pollen}, Weed pollen: ${pollen.weed_pollen}`
    //     console.log(pollen)
    // })

    // https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

    return (
        <div>
            <p>This page is for testing AJAX requests. Information will only appear in
                the JavaScript debug console.</p>
            <br></br>
            <p>Nothing more to see here</p>
        </div>
    );
}

export default Test;    