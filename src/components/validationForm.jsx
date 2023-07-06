import React, { useEffect, useState } from 'react'

function ValidationForm() {
    let blankObj = { firstName: "", lastName: "", birthDate: "", email: "", password: "", confirmPassword: "", gender: "", contact: "", hobbies: [], information: "" }
    const [obj, setobj] = useState({ ...blankObj })
    const [errorObj, seterrorObj] = useState({})
    const [arr, setarr] = useState([])
    let [filterArray, setfilterArray] = useState([])
    const [filterObj, setfilterObj] = useState({ firstName: '', lastName: '', email: '' })

    useEffect(() => {
        filterArray = arr;
        setfilterArray([...filterArray])
    }, [])

    let validationData = [
        {
            name: 'firstName',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'First Name is required'
                },
                {
                    error: '/[0-9]/.test(value)',
                    msg: 'First Name cannot contain Number'
                }
            ]
        },
        {
            name: 'lastName',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Last Name is required'
                },
                {
                    error: '/[0-9]/.test(value)',
                    msg: 'Last Name cannot contain Number'
                }
            ]
        },
        {
            name: 'email',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Email is required'
                },
                {
                    error: '!value.includes("@gmail") && !value.includes("@outlook")',
                    msg: 'Email must contain @gmail or @outlook'
                },
                {
                    error: '!value.includes(".com")',
                    msg: 'Email must contain com'
                }
            ]
        },
        {
            name: 'birthDate',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Birth Date is required'
                },
                {
                    error: 'over18(value)',
                    msg: 'Age must have 18 years old'
                }
            ]
        },
        {
            name: 'contact',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Contact is required'
                },
                {
                    error: 'value?.length != 10 || value < 0',
                    msg: 'Contact must have 10 Numbers'
                }
            ]
        },
        {
            name: 'gender',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Gender is required'
                }
            ]
        },
        {
            name: 'hobbies',
            conditions: [
                {
                    error: 'obj.hobbies?.length < 3',
                    msg: 'Select any 3 hobbies'
                }
            ]
        },
        {
            name: 'information',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Information is required'
                }
            ]
        },
        {
            name: 'password',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Password is required'
                },
                {
                    error: 'validPasswordAndConfirmPassword()',
                }
            ]
        },
        {
            name: 'confirmPassword',
            conditions: [
                {
                    error: 'value == ""',
                    msg: 'Confirm Password is required'
                },
                {
                    error: 'obj.password != value',
                    msg: 'Password and Confirm Password must be same.'
                }
            ]
        }
    ]

    const validPasswordAndConfirmPassword = () => {
        console.log('jhk', )
        if (obj.password != obj.confirmPassword && obj.confirmPassword != '') {
            errorObj.confirmPassword = "Password and Confirm Password must be same."
        } else if (obj.confirmPassword != '') {
            delete errorObj.confirmPassword
        }
        return false
    }
    function over18(birthDate) {
        var now = new Date();
        var m = now.getMonth();
        now.setFullYear(now.getFullYear() - 18);
        if (m != now.getMonth()) now.setDate(0);
        return new Date(birthDate) > now;
    }

    const getData = (e) => {
        if (e.target.name == 'hobbies') {
            if (e.target.checked) {
                obj[e.target.name].push(e.target.value)
            } else {
                obj[e.target.name] = obj[e.target.name].filter(x => x != e.target.value)
            }
        } else if (e.target.name == 'information') {
            obj[e.target.name] = e.target.value.replace(/\b\w/g, l => l.toUpperCase())
        } else {
            obj[e.target.name] = e.target.value;
        }
        setobj({ ...obj })

        Validate(e.target.name, e.target.value);
        seterrorObj({ ...errorObj })
    }
    const save = () => {
        for (let key in obj) {
            Validate(key, obj[key])
        }

        if (Object.keys(errorObj).length == 0) {
            arr.push(obj)
            setarr([...arr])
            filterArray = [...arr]
            setfilterArray([...filterArray])
            setobj({ ...blankObj })
        }
    }

    const Validate = (name, value) => {
        let errorConditions = validationData.find(x => x.name == name)?.conditions;
        let isError = errorConditions?.find((x) => eval(x.error))?.msg
        if (isError) {
            errorObj[name] = isError
        } else {
            delete errorObj[name];
        }

        seterrorObj({ ...errorObj })
    }


    const getFilterData = (e) => {
        filterObj[e.target.name] = e.target.value;
        setfilterObj({ ...filterObj })

        let filterCondition = [];

        for (let key in filterObj) {
            if (filterObj[key] != '') {
                filterCondition.push(`x.${key}.includes('${filterObj[key]}')`)
            }
        }

        let data = arr.filter(x => eval(filterCondition.join(' && ')))
        if (filterCondition.length > 0) {
            filterArray = [...data]
            setfilterArray([...filterArray])
        } else {
            filterArray = [...arr]
            setfilterArray([...filterArray])
        }

    }
    return (
        <>

            <form action="" className='m-4'>
                <h4 className='ms-2'>Search</h4>
                <input type="text" placeholder='First Name' name="firstName" className='m-2 p-2' onChange={getFilterData} />
                <input type="text" placeholder='Last Name' name="lastName" className='m-2 p-2' onChange={getFilterData} />
                <input type="email" placeholder='Email' name="email" className='m-2 p-2' onChange={getFilterData} />
            </form>

            <form action="" className='w-50 p-4 shadow-lg m-4 mx-auto'>
                <h3>FORM</h3>
                <label className='fs-5 mt-2 w-100'>First Name</label>
                <input type="text" className='w-100 p-2' name='firstName' value={obj.firstName} onChange={getData} />
                {errorObj.firstName ? <><span className='text-danger d-block'>{errorObj.firstName}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Last Name</label>
                <input type="text" className='w-100 p-2' name='lastName' value={obj.lastName} onChange={getData} />
                {errorObj.lastName ? <><span className='text-danger d-block'>{errorObj.lastName}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Email</label>
                <input type="email" className='w-100 p-2' name='email' value={obj.email} onChange={getData} />
                {errorObj.email ? <><span className='text-danger d-block'>{errorObj.email}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Date of Birth</label>
                <input type="date" className='w-100 p-2' name='birthDate' value={obj.birthDate} onChange={getData} />
                {errorObj.birthDate ? <><span className='text-danger d-block'>{errorObj.birthDate}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Password</label>
                <input type="password" className='w-100 p-2' name='password' value={obj.password} onChange={getData} />
                {errorObj.password ? <><span className='text-danger d-block'>{errorObj.password}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Confirm Password</label>
                <input type="password" className='w-100 p-2' name='confirmPassword' value={obj.confirmPassword} onChange={getData} />
                {errorObj.confirmPassword ? <><span className='text-danger d-block'>{errorObj.confirmPassword}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Gender</label>
                <input type="radio" className='p-2 m-2 ms-0' name='gender' value='Male' checked={obj.gender == 'Male'} onChange={getData} /> Male
                <input type="radio" className='p-2 m-2' name='gender' checked={obj.gender == 'Female'} value='Female' onChange={getData} /> Female
                {errorObj.gender ? <><span className='text-danger d-block'>{errorObj.gender}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Contact No.</label>
                <input type="number" className='w-100 p-2' name='contact' value={obj.contact} onChange={getData} />
                {errorObj.contact ? <><span className='text-danger d-block'>{errorObj.contact}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Hobbies</label>
                <input type="checkbox" className='p-2 m-2 ms-0' name='hobbies' value='Writing' checked={obj?.hobbies?.includes('Writing')} onChange={getData} /> Writing
                <input type="checkbox" className='p-2 m-2' name='hobbies' value='Driving' checked={obj?.hobbies?.includes('Driving')} onChange={getData} /> Driving
                <input type="checkbox" className='p-2 m-2' name='hobbies' value='Reading' checked={obj?.hobbies?.includes('Reading')} onChange={getData} /> Reading
                <input type="checkbox" className='p-2 m-2' name='hobbies' value='Music' checked={obj?.hobbies?.includes('Music')} onChange={getData} /> Music
                <input type="checkbox" className='p-2 m-2' name='hobbies' value='Travelling' checked={obj?.hobbies?.includes('Travelling')} onChange={getData} /> Travelling
                {errorObj.hobbies ? <><span className='text-danger d-block'>{errorObj.hobbies}</span></> : <></>}
                <label className='fs-5 mt-2 w-100'>Information</label>
                <textarea name="information" className='w-100 p-2' cols="20" rows="2" value={obj.information} onChange={getData}></textarea>
                {errorObj.information ? <><span className='text-danger d-block'>{errorObj.information}</span></> : <></>}
                <br />

                <button type='button' className='btn btn-dark px-4 mt-3' onClick={save}>Save</button>
            </form>

            <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Contact no.</th>
                        <th>Hobbies</th>
                        <th>Information</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterArray?.map((x, i) => {
                            return <tr>
                                <td>{i + 1}</td>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.email}</td>
                                <td>{x.birthDate}</td>
                                <td>{x.gender}</td>
                                <td>{x.contact}</td>
                                <td>{x.hobbies}</td>
                                <td>{x.information}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ValidationForm