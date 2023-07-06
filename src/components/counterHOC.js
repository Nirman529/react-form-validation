import React, { useState } from 'react'

const HigherComponent = (OriginalComponent) => {

    function NewComponent() {
        const [count, setCount] = useState(0);
        const add = () => {
            setCount(count + 1)
        }
        const subtract = () => {
            setCount(count - 1)
        }
        return <OriginalComponent add={add} subtract={subtract} count={count} />
    }

    return NewComponent;
}

export default HigherComponent;