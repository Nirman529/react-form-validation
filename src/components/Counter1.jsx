import React from 'react'
import HigherComponent from './counterHOC'
const api = "https://jsonplaceholder.typicode.com/todos"

const Counter1 = ({ count, add, subtract, res }) => {

    return (
        <>
            <div className='m-3 border rounded bg-light'>
                <h2 className='m-1'>Todos</h2>
                <div>Page No.: {count + 1}</div>
                <button className='btn btn-secondary m-1' onClick={subtract}>previous</button>
                <button className='btn btn-primary m-1' onClick={add}>Next</button>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>To-do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {res?.slice(count * 10, count * 10 + 10).map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HigherComponent(Counter1, api)