import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const HiveList = ({ hives, title }) => {

    // const [hives, setHives] = useState(null)
    // async function getHives() {
    //     let response = await axios.get('/hives');
    //     // console.log(response.data.hives[0])
    //     let test = response.data.hives
    //     // for (let i = 0; i < test.length; i++) {
    //     //     hiveList.push(test[i])
    //     // }
    //     // console.log(hiveList)
    //     // setHives(response.data.hives)
    //     setHives(test)
    // }

    // useEffect(() => {
    //     getHives()

    // }, [])

    return (
        <div className="blog-list">
            {/* <h1>This is the list {hives && hives[0].id} page</h1> */}
            <h2><u>{title}</u></h2>
            <br />
            {hives && hives.map((hive) => (
                <div>
                    {/* {console.log(hive.id, "testing")} */}
                    < div className="blog-preview" key={hive.id} >
                        <a href={`#/hivedetail/${hive.id}`}><h3>ID:{hive.id} - {hive.nickname}</h3>
                        </a>
                        <p>Notes: {hive.notes}</p>
                        <br />
                    </div>
                </div>
            ))
            }
        </div >
    );
}

export default HiveList;