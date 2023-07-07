import React from 'react'
import HigherComponent from './counterHOC'
const api = "https://jsonplaceholder.typicode.com/comments"

const Counter2 = ({ count, add, subtract, res }) => {

    return (
        <>
            <div className='m-3 border rounded bg-light'>
                <h2 className='m-1'>Comments</h2>
                <div>Page No.: {count + 1}</div>
                <button className='btn btn-secondary m-1' onClick={subtract}>Previous</button>
                <button className='btn btn-primary m-1' onClick={add}>Next</button>
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res?.slice(count * 10, count * 10 + 10).map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>
                                            {item.name}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default HigherComponent(Counter2, api)