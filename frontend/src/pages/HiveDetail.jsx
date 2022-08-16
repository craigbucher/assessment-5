import axios from 'axios'
import { useEffect, useState } from 'react';
import Delete from './Delete'
import { useNavigate } from "react-router-dom";

const HiveDetail = () => {
    // console.log('Hive loaded')
    let navigate = useNavigate();

    ///////////////////////////////////////////////////////
    /////////////////////// Logging ///////////////////////
    ///////////////////////////////////////////////////////

    useEffect(() => {
        location()
    }, [])



    ///////////////////////////////////////////////////////
    /////////////////// Form Submission ///////////////////
    ///////////////////////////////////////////////////////

    const handleSubmit = function (event) {
        event.preventDefault()

        // console.log('0 - nickname', event.target[0].value)
        // console.log('1 - install_date', event.target[1].value)
        // console.log('2 - location_name', event.target[2].value)
        // console.log('3 - loc_lat', event.target[3].value)
        // console.log('4 - loc_lat', event.target[4].value)
        // console.log('5 - depth', event.target[5].value)
        // console.log('6 - frames 8', event.target[6].value)
        // console.log('7 - frames 10', event.target[7].value)
        // console.log('8 - active yes', event.target[8].value)
        // console.log('9 - active no', event.target[9].value)
        // console.log('10 - breed', event.target[10].value)
        // console.log('11 - notes', event.target[12].value)

        // const depthButtons = document.querySelectorAll('input[name="frames"]');
        // // console.log(radioButtons)
        // let selectedFrame
        // for (const depthButton of depthButtons) {
        //     // console.log(radioButton.checked)
        //     if (depthButton.checked) {
        //         selectedFrame = depthButton.value;
        //         // console.log(selectedFrame)
        //         // break;
        //     }
        // }
        // console.log(selectedFrame)

        // const activeButtons = document.querySelectorAll('input[name="active"]');
        // let selectedActive
        // for (const activeButton of activeButtons) {
        //     if (activeButton.checked) {
        //         selectedActive = activeButton.value;
        //     }
        // }
        // console.log(selectedActive)


        axios.post('/hives/', { nickname: event.target[0].value, install_date: event.target[1].value, location_name: event.target[2].value, loc_lat: event.target[3].value, loc_long: event.target[4].value, depth: event.target[5].value, frames: selectedFrame, active: selectedActive, breed: event.target[10].value, notes: event.target[11].value, }).then((response) => {
            console.log('response from server: ', response)
            if (response.status === 200) {
                window.alert(`New hive "${event.target[0].value}" created!`)
                // window.location.reload()
                navigate("/hivelist");
            }
        })

    }


    return (
        <div>

            <div className="hive">
                <h2>Hive Details</h2>
                <h3>Hive ID:</h3>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="nickname">Nickname:  </label>
                    <input type="text" id="nickname" name="nickname" placeholder="Nickname" required />
                    <label for="install_date">&emsp;Install date:  </label>
                    {/* <input type="date" id="install_date" name="install_date" value={today} /> */}
                    <input type="date" id="install_date" name="install_date" required />
                </div>
                <br />
                <div>
                    <label for="location">Location:  </label>
                    <input type="text" id="location" name="location" placeholder="Location" value={city} onChange={(e) => setCity(e.target.value)} />
                    <label for="latitude">&emsp;Latitude:  </label>
                    <input type="text" id="latitude" name="latitude" placeholder="00.000000" value={lat} onChange={(e) => setLat(e.target.value)} />
                    <label for="longitude">&emsp;Longitude:  </label>
                    <input type="text" id="longitude" name="longitude" placeholder="-00.000000" value={long} onChange={(e) => setLong(e.target.value)} />
                    {/* <a href="https://gps-coordinates.org/" target="_blank">Lat/Long Search</a> */}
                </div>
                <br />
                <div>
                    <br />
                    <label for="depth">Main body depth:  </label>
                    <select id="depth" name="depth">
                        <option value="none"></option>
                        <option value="deep">Deep</option>
                        <option value="medium">Medium</option>
                        <option value="shallow">Shallow</option>
                    </select>

                    <label for="frames">&emsp;Frames:  </label>
                    <label for="8">8  </label>
                    <input type="radio" id="8" name="frames" value="8" />
                    <label for="10">  10  </label>
                    <input type="radio" id="10" name="frames" value="10" checked />

                    <label for="active">&emsp;Active?:  </label>
                    <label for="Yes">Yes  </label>
                    <input type="radio" id="Yes" name="active" value="True" checked />
                    <label for="No">  No  </label>
                    <input type="radio" id="No" name="active" value="False" />

                    <label for="breed">&emsp;Breed:  </label>
                    <select id="breed" name="breed">
                        <option value="italian">Italian</option>
                        <option value="buckfast">Buckfast</option>
                        <option value="caucasian">Caucasian</option>
                        <option value="carniolan">Carniolan</option>
                        <option value="german">German</option>
                        <option value="russian">Russian</option>
                    </select>

                    {/* <label for="removal_date">&emsp;Removal date:  </label>
                    <input type="date" id="removal_date" name="removal_date" /> */}
                </div>
                <br />
                <div>
                    <label for="notes">Notes:  </label>
                    <br />
                    <textarea id="notes" name="notes" rows="4" cols="50" placeholder="Please enter other notes about the hive here.">
                    </textarea>
                </div>
                <br />
                <div>
                    <input type="reset" />
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}

export default HiveDetail;