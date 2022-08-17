import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const InspectionList = ({ inspections, title }) => {

    // const [inspections, setInspections] = useState(null)
    // let test
    // async function getInspections() {
    //     let response = await axios.get('/inspections');
    //     // console.log(response.data.inspections)
    //     test = await response.data.inspections
    //     // console.log(Object.values(test))
    //     setInspections(response.data.inspections)
    // }

    // useEffect(() => {
    //     getInspections()

    // }, [])

    // console.log(inspections)

    return (
        <div className="blog-list">
            {/* <h1>This is the list {hives && hives[0].id} page</h1> */}
            <h2><u>{title}</u></h2>
            <br />
            {inspections && inspections.map((inspection) => (
                <div className="blog-preview" key={inspection.id}>
                    <Link to={`/inspections/${inspection.id}`}>
                        <h3>ID:{inspection.id} - {inspection.inspection_date}</h3>
                        <p>Notes: {inspection.notes}</p>
                    </Link>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default InspectionList;