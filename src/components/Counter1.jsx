import React from 'react'
import HigherComponent from './counterHOC'

const Counter1 = ({ count, add, subtract }) => {
    return (
        <>
            <div className='m-3 border rounded bg-light'>
                <h2 className='m-1'>Counter 1</h2>
                <button className='btn btn-primary m-1' onClick={add}>Add</button>
                <div className=''>{count}</div>
                <button className='btn btn-secondary m-1' onClick={subtract}>Subtract</button>
            </div>
        </>
    )
}

export default HigherComponent(Counter1)