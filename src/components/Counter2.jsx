import React from 'react'
import HigherComponent from './counterHOC'

const Counter2 = ({ count, add, subtract }) => {
    return (
        <>
            <div className='m-3 border rounded bg-light'>
                <h2>Counter 2</h2>
                <button className='btn btn-primary m-1' onClick={add}>Add</button>
                <div>{count}</div>
                <button className='btn btn-secondary m-1' onClick={subtract}>Subtract</button>
            </div>
        </>
    )
}

export default HigherComponent(Counter2)