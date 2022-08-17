import InspectionList from "./InspectionList";
import { useEffect, useState } from 'react';
import axios from 'axios'

const Inspections = () => {
    console.log('inspections loaded')
    const [inspections, setInspections] = useState(null)
    async function getInspections() {
        let response = await axios.get('/inspections');
        // console.log(response.data.hives[0])
        let result = response.data.inspections
        // for (let i = 0; i < test.length; i++) {
        //     hiveList.push(test[i])
        // }
        // console.log(hiveList)
        // setHives(response.data.hives)
        console.log(result)
        setInspections(result)
    }

    useEffect(() => {
        getInspections()

    }, [])

    return (
        <div className='home'>
            {/* {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>} */}
            {inspections && <InspectionList inspections={inspections} title="All Inspections" />}
        </div>
    );
}

export default Inspections;