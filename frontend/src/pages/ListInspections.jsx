import axios from 'axios'
import { useEffect, useState } from 'react';

const ListInspections = () => {

    const [inspections, setInspections] = useState(null)
    let test
    async function getInspections() {
        let response = await axios.get('/inspections');
        // console.log(response.data.inspections)
        test = await response.data.inspections
        // console.log(Object.values(test))
        setInspections(response.data.inspections)
    }

    useEffect(() => {
        getInspections()

    }, [])

    console.log(inspections)

    return (
        <div>
            <h1>This is the list inspections page</h1>
        </div>
    );
}

export default ListInspections;