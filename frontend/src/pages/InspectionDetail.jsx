import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const NewInspection = (inspect_id) => {
    // console.log('Inspection loaded')
    let navigate = useNavigate();
    inspect_id = 1;
    ///////////////////////////////////////////////////////
    ////////////// Retrieve Inspection Info ///////////////
    ///////////////////////////////////////////////////////

    const [inspection_date, setInspectionDate] = useState(null)
    const [temp, setTemp] = useState(null)
    const [humidity, setHumidity] = useState(null)
    const [pollen_type, setPollenType] = useState(null)
    const [queen_sight, setQueenSight] = useState(null)
    const [queen_cells, setQueenCells] = useState(null)
    const [has_swarmed, setHasSwarmed] = useState(null)
    const [feeding, setFeeding] = useState(null)
    const [supers, setSupers] = useState(null)
    const [disease, setDisease] = useState(null)
    const [meds, setMeds] = useState(null)
    const [notes, setNotes] = useState(null)

    async function update() {
        let response = await axios.get(`/inspections/${inspect_id}`);
        setInspectionDate(response.data.inspection_date)
        setTemp(response.data.temperature)
        setHumidity(response.data.humidity)
        setPollenType(response.data.pollen_type)
        setQueenSight(response.data.queen_sight)
        setQueenCells(response.data.queen_cells)
        setHasSwarmed(response.data.has_swarmed)
        setFeeding(response.data.feeding)
        setSupers(response.data.supers)
        setDisease(response.data.disease)
        setMeds(response.data.meds)
        setNotes(response.data.notes)
    }

    ///////////////////////////////////////////////////////
    ////////////////////// Logging  ///////////////////////
    ///////////////////////////////////////////////////////

    useEffect(() => {
        update()
    }, [])

    ///////////////////////////////////////////////////////
    /////////////////// Form Submission ///////////////////
    ///////////////////////////////////////////////////////

    const handleSubmit = function (event) {
        event.preventDefault()

        // console.log('0 - inspection_date', event.target[0].value)
        // console.log('1 - temperature', event.target[1].value)
        // console.log('2 - humidity', event.target[2].value)
        // console.log('3 - pollen_type', event.target[3].value)
        // console.log('4 - queen_sight', event.target[4].value)
        // console.log('6 - queen_cells', event.target[6].value)
        // console.log('8 - has_swarmed', event.target[8].value)
        // console.log('10 - feeding', event.target[10].value)
        // console.log('11 - supers', event.target[11].value)
        // console.log('13 - disease', event.target[13].value)
        // console.log('14 - meds', event.target[14].value)
        // console.log('15 - notes', event.target[15].value)

        // const queenButtons = document.querySelectorAll('input[name="queen"]');
        // let selectedQueen
        // for (const queenButton of queenButtons) {
        //     if (queenButton.checked) {
        //         selectedQueen = queenButton.value;
        //     }
        // }
        // // console.log(selectedQueen)

        // const cellButtons = document.querySelectorAll('input[name="cells"]');
        // let selectedCell
        // for (const cellButton of cellButtons) {
        //     if (cellButton.checked) {
        //         selectedCell = cellButton.value;
        //     }
        // }
        // // console.log(selectedCell)

        // const swarmButtons = document.querySelectorAll('input[name="swarm"]');
        // let selectedSwarm
        // for (const swarmButton of swarmButtons) {
        //     if (swarmButton.checked) {
        //         selectedSwarm = swarmButton.value;
        //     }
        // }
        // // console.log(selectedSwarm)

        // const supersButtons = document.querySelectorAll('input[name="supers"]');
        // let selectedSuper
        // for (const supersButton of supersButtons) {
        //     if (supersButton.checked) {
        //         selectedSuper = supersButton.value;
        //     }
        // }
        // // console.log(selectedSuper)

        // axios.post('/inspections/', { curr_hive: 1, inspection_date: event.target[0].value, temperature: event.target[1].value, humidity: event.target[2].value, pollen_type: event.target[3].value, queen_sight: selectedQueen, queen_cells: selectedCell, has_swarmed: selectedSwarm, feeding: event.target[10].value, supers: selectedSuper, disease: event.target[13].value, meds: event.target[14].value, notes: event.target[15].value, }).then((response) => {
        //     console.log('response from server: ', response)
        //     // console.log(response.data.status)
        //     if (response.data.status === 'complete') {
        //         window.alert(`New inspection "${event.target[0].value}" created!`)
        //         // window.location.reload()
        //         navigate("/inspectionlist");
        //     }
        // })

    }

    return (
        <div>
            <div className="inspection">
                <h2>Inspection Details</h2>
                {/* <h3>User:&emsp;&emsp;</h3> */}
                <br />
                <h3>Inspection ID: {inspect_id}</h3>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="inspection_date">Inspection Date:  </label>
                    <input type="date" id="inspection_date" name="inspection_date" value={inspection_date} onChange={(e) => setInspectionDate(e.target.value)} required />
                </div>
                <br />
                <div>
                    <label for="temperature">Temperature:  </label>
                    <input type="text" id="temperature" name="temperature" placeholder="temperature" value={temp} onChange={(e) => setTemp(e.target.value)} />
                    <label for="humidity">&emsp;Humidity:  </label>
                    <input type="text" id="humidity" name="humidity" placeholder="humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
                </div>
                <br />
                <div>
                    <label for="pollen">Pollen type(s):  </label>
                    <input type="text" id="pollen" name="pollen" placeholder="pollen" value={pollen_type} size='50' onChange={(e) => setPollenType(e.target.value)} />
                    {/* <label for="count">&emsp;Pollen count:</label>
                    <input type="text" id="count" name="count" placeholder="count" /> */}
                </div>
                <div>
                    <br />
                    <label for="queen">Queen sighted?&ensp;</label>
                    <label for="yes">Yes  </label>
                    <input type="radio" id="yes" name="queen" value="True" />
                    <label for="no">  No  </label>
                    <input type="radio" id="no" name="queen" value="False" checked />

                    <label for="cells">&emsp;Queen cells?&ensp;</label>
                    <label for="Yes">Yes  </label>
                    <input type="radio" id="Yes" name="cells" value="True" />
                    <label for="No">  No  </label>
                    <input type="radio" id="No" name="cells" value="False" checked />

                    <label for="swarm">&emsp;Swarmed?&ensp;</label>
                    <label for="Yes">Yes  </label>
                    <input type="radio" id="Yes" name="swarm" value="True" />
                    <label for="No">  No  </label>
                    <input type="radio" id="No" name="swarm" value="False" checked />
                </div>
                <br />
                <div>
                    <label for="food">Feeding:  </label>
                    <select id="food" name="food">
                        <option value="none"></option>
                        <option value="syrup" selected>Syrup</option>
                        <option value="polle">Pollen supplement</option>
                    </select>

                    <label for="supers">&emsp;Honey supers on?&ensp;</label>
                    <label for="Yes">Yes  </label>
                    <input type="radio" id="Yes" name="supers" value="True" />
                    <label for="No">  No  </label>
                    <input type="radio" id="No" name="supers" value="False" checked />
                </div>
                <br />
                <div>
                    <label for="disease">Disease(s)/parasite(s) evident?  </label>
                    <input type="text" id="disease" name="disease" placeholder="disease" value={disease} onChange={(e) => setDisease(e.target.value)} />
                    <label for="meds">  Medication(s) applied:  </label>
                    <input type="text" id="meds" name="meds" placeholder="meds" value={meds} onChange={(e) => setMeds(e.target.value)} />
                </div>
                <br />
                <div>
                    <label for="notes">Notes:</label>
                    <br />
                    <textarea id="notes" name="notes" rows="6" cols="70" placeholder="Please enter other notes about the inspection here." value={notes} onChange={(e) => setNotes(e.target.value)} >
                    </textarea>
                </div>
                <br />
                {/* <div>
                    <input type="reset" />
                    <div className='space'></div>
                    <input type="submit" />
                </div> */}
            </form>
        </div>

    );
}

export default NewInspection;