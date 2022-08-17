import HiveList from "./HiveList";
import { useEffect, useState } from 'react';
import axios from 'axios'

const Hives = () => {

    const [hives, setHives] = useState(null)
    async function getHives() {
        let response = await axios.get('/hives');
        // console.log(response.data.hives[0])
        let result = response.data.hives
        // for (let i = 0; i < test.length; i++) {
        //     hiveList.push(test[i])
        // }
        // console.log(hiveList)
        // setHives(response.data.hives)
        setHives(result)
    }

    useEffect(() => {
        getHives()

    }, [])




    return (
        <div className='home'>
            {/* {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>} */}
            {hives && <HiveList hives={hives} title="All Hives" />}
        </div>
    );
}

export default Hives;