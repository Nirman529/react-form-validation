import React, { useState, useEffect } from 'react'
import axios from "axios"

const HigherComponent = (OriginalComponent, api) => {
    const NewComponent = () => {
        const [count, setCount] = useState(0);
        const [res, setRes] = useState([])

        useEffect(() => {
            apiCall()
        }, [])

        const apiCall = async () => {
            await axios.get(`${api}`)
                .then((response) => {
                    setRes(response.data)
                })
        }

        const add = () => {
            setCount(count + 1)
        }

        const subtract = () => {
            if (count > 0) {
                setCount(count - 1)
            }
        }
        return <OriginalComponent add={add} subtract={subtract} count={count} res={res} />
    }

    return NewComponent;
}

export default HigherComponent;