import { useEffect, useState } from 'react'
import React from 'react'

const MyForm = () => {
    let firstObject = {
        firstName: '', lastName: '', dateOfBirth: '', gender: '', contactNumber: '', emailAddress: '', password: '', confirmPassword: '', hobbies: [], information: '',
    }
    let firstError = {
        firstName: '', lastName: '', dateOfBirth: '', gender: '', contactNumber: '', emailAddress: '', password: '', confirmPassword: '', hobbies: [], information: '',
    }

    const [data, setData] = useState([])
    const [obj, setObj] = useState({ ...firstObject })
    const [errors, setErrors] = useState({ ...firstError })
    const [id, setId] = useState(1);

    const valueOnChange = (e) => {
        let switchCon = e.target.name.split('.')[0]
        var numberRe = /\d/;
        switch (switchCon) {
            case 'firstName':
                if (e.target.value) {
                    if (numberRe.test(e.target.value)) {
                        errors.firstName = 'First name should not contain a number'
                    } else {
                        errors.firstName = ''
                    }
                } else {
                    errors.firstName = 'Empty First Name'
                }
                setErrors({ ...errors })
                setObj({ ...obj, [e.target.name]: e.target.value });
                break;

            case 'lastName':
                setObj({ ...obj, [e.target.name]: e.target.value })
                if (e.target.value) {
                    if (numberRe.test(e.target.value)) {
                        errors.lastName = 'Last name should not contain a number'
                    } else {
                        errors.lastName = ''
                    }
                } else {
                    errors.lastName = 'Empty Last Name'
                }
                setErrors({ ...errors })
                break;

            case 'dateOfBirth':
                var birthDate = e.target.value
                const getAge = (birthDate) => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
                if (birthDate) {
                    if (getAge(birthDate) > 17) {
                        errors.dateOfBirth = ''
                    } else {
                        errors.dateOfBirth = 'You are under 18'
                    }
                } else {
                    errors.dateOfBirth = 'Empty Birth Date'
                }
                setErrors({ ...errors })
                setObj({ ...obj, [e.target.name]: e.target.value });
                break;

            case 'gender':
                setObj({ ...obj, [e.target.name]: e.target.value });
                errors.gender = ''
                setErrors({ ...errors })
                break;

            case 'contactNumber':
                let tel = e.target.value
                if (tel.length !== 10) {
                    errors.contactNumber = 'contact number not 10 digit long'
                } else {
                    errors.contactNumber = ''
                }
                setErrors({ ...errors })
                setObj({ ...obj, [e.target.name]: e.target.value });
                break;

            case 'emailAddress':
                var emailRe = new RegExp('^[a-z]+(@gmail.com|@outlook.com)$')
                if (e.target.value) {
                    if (!emailRe.test(e.target.value)) {
                        errors.emailAddress = 'Incorrect email'
                    } else {
                        errors.emailAddress = ''
                    }
                } else {
                    errors.emailAddress = 'Email should not be empty'
                }
                setErrors({ ...errors })
                setObj({ ...obj, [e.target.name]: e.target.value });
                break;

            case 'password':
                if (e.target.value === '') {
                    errors.password = 'password should not be empth'
                    errors.confirmPassword = 'password should not be empth'
                } else {
                    if (e.target.value !== obj.confirmPassword) {
                        errors.confirmPassword = 'password not matching'
                    } else {
                        errors.confirmPassword = ''
                        errors.password = ''
                    }
                }
                setErrors({ ...errors })
                setObj({ ...obj, [e.target.name]: e.target.value });
                break;

            case 'confirmPassword':
                if (e.target.value !== obj.password) {
                    errors.confirmPassword = 'password not matching'
                } else {
                    errors.confirmPassword = ''
                }
                if (e.target.value === '') {
                    errors.confirmPassword = 'Confirm password should not be empty'
                }
                setObj({ ...obj, [e.target.name]: e.target.value });
                setErrors({ ...errors })
                break;

            case 'hobbies':
                if (e.target.checked) {
                    obj[e.target.name].push(e.target.value)
                    setObj({ ...obj })
                } else {
                    let newHobby = obj.hobbies.filter(
                        (x) => x !== e.target.value
                    );
                    setObj({ ...obj, [e.target.name]: newHobby });
                }

                if (obj.hobbies.length < 3) {
                    errors.hobbies = 'Please select atleast 3 hobbies'
                } else {
                    errors.hobbies = ''
                }
                setErrors({ ...errors })
                console.log('obj.hobbies', obj.hobbies)
                break;

            case 'information':
                var temp = e.target.value
                var temp2 = temp.split(/\s+/)
                for (let i = 0; i < temp2.length; i++) {
                    temp2[i] = temp2[i].charAt(0).toUpperCase() + temp2[i].slice(1)
                }

                if (temp.length) {
                    errors.information = ''
                } else {
                    errors.information = 'Information cannot be empty'
                }
                setErrors({ ...errors })
                setObj({ ...obj, [e.target.name]: temp2.join(' ') });
                break;

            default:
                break;
        }
    }

    const submit = (e) => {
        e.preventDefault();
        let isEmpty = Object.values(obj).includes('');
        let hobbieCheck = obj.hobbies.length < 3

        if (isEmpty && hobbieCheck) {
            console.log('obj', obj)
            if (obj.firstName === '') {
                errors.firstName = 'Enter your first name'
                setErrors({ ...errors, firstName: 'Enter your first name' });
            }
            if (obj.lastName === '') {
                errors.lastName = 'Enter your last name'
                setErrors({ ...errors, lastName: 'Enter your last name' });
            }
            if (obj.dateOfBirth === '' || errors.dateOfBirth !== '') {
                if (errors.dateOfBirth !== '') {

                } else {
                    errors.dateOfBirth = 'Enter your birthdate'
                }
                setErrors({ ...errors, dateOfBirth: 'Enter your birthdate' });
            }
            if (obj.gender === '') {
                errors.gender = 'Please select your gender'
                setErrors({ ...errors, gender: 'Please select your gender' });
            }
            if (obj.contactNumber === '' || errors.contactNumber !== '') {
                if (errors.contactNumber !== '') {

                } else {
                    errors.contactNumber = 'Enter your contact number'
                }
                setErrors({ ...errors, contactNumber: 'Enter your contact number' });
            }
            if (obj.emailAddress === '' || errors.emailAddress !== '') {
                if (errors.emailAddress !== '') {

                } else {
                    errors.emailAddress = 'Enter your email address'
                }
                setErrors({ ...errors, emailAddress: 'Enter your email address' });
            }
            if (obj.password === '') {
                errors.password = 'Enter your password'
                setErrors({ ...errors, password: 'Enter your password' });
            }
            if (obj.confirmPassword === '' || errors.confirmPassword !== '') {
                if (errors.confirmPassword !== '') {

                } else {
                    errors.confirmPassword = 'Confirm your password'
                }
                setErrors({ ...errors, confirmPassword: 'Confirm your password' });
            }
            if (obj.hobbies.length < 3) {
                errors.hobbies = 'Select atleast 3 hobbies'
                setErrors({ ...errors, hobbies: 'Select atleast 3 hobbies' });
            }
            if (obj.information === '') {
                errors.information = 'Enter some information'
                setErrors({ ...errors, information: 'Enter some information' });
            }
        } else {
            obj.id = id
            console.log('obj', obj)
            setId(id + 1)
            data.push(obj)
            setData([...data])
            setObj(firstObject)
            setErrors(firstError)
        }
    };

    useEffect(() => {
    }, [])

    return (
        <>
            <div className='row border rounded m-3 bg-light'>
                <h4>Filter Options</h4>
                <div>First Name: <input className='text' type='text' name='filterFirstName' id='filterFname' /></div>
                <div>Last Name: <input className='text' type='text' name='filterLastName' id='filterLname' /></div>
                <div>E-mail address: <input className='text' type='text' name='filterEmail' id='filterEmail' /></div>
            </div>

            <div className='row m-0 mt-2 mb-2'>
                <div className='col-2'></div>
                <form onSubmit={submit} className='col-8 border rounded shadow'>
                    <h4>Form: </h4>
                    <div className='row border m-1 mt-1 align-items-center'>
                        <div className='col '>
                            <label className='m-1'>First Name:</label>
                        </div>
                        <div className='col justify-content-center align-items-center'>
                            <input type='text' className='form-control' name='firstName' value={obj.firstName} placeholder='Enter your first name' onChange={(e) => valueOnChange(e)} />
                            {errors.firstName === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.firstName}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col '>
                            <label className='m-1'> Last Name:</label>
                        </div>
                        <div className='col'>
                            <input type='text' className='form-control m-1' name='lastName' value={obj.lastName} placeholder='Enter your last name' onChange={(e) => valueOnChange(e)} />
                            {errors.lastName === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.lastName}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col '>
                            <label className='m-1'> Date of birth:</label>
                        </div>
                        <div className='col'>
                            <input type='date' className='date m-1' name='dateOfBirth' value={obj.dateOfBirth} onChange={(e) => valueOnChange(e)} />
                            {errors.dateOfBirth === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.dateOfBirth}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col '>
                            <label className='m-1'> Gender:</label>
                        </div>
                        <div className='col justify-content-begin text-begin align-items-center'>
                            <input className='form-check-input m-1' type='radio' name='gender' value='male' checked={obj.gender === 'male'} onChange={(e) => valueOnChange(e)} /> male <br />
                            <input className='form-check-input m-1' type='radio' name='gender' value='female' checked={obj.gender === 'female'} onChange={(e) => valueOnChange(e)} /> female
                            {errors.gender === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.gender}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col '>
                            <label className='m-1'> Contact No.:</label>
                        </div>
                        <div className='col'>
                            <input type='number' className='form-control m-1' name='contactNumber' value={obj.contactNumber} placeholder='Enter 10 digit phone number' onChange={(e) => valueOnChange(e)} />
                            {errors.contactNumber === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.contactNumber}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col'>
                            <label className='m-1'> Email address:</label>
                        </div>
                        <div className='col'>
                            <input type='text' className='form-control m-1' name='emailAddress' value={obj.emailAddress} placeholder='Enter your email address' onChange={(e) => valueOnChange(e)} />
                            {errors.emailAddress === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.emailAddress}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col'>
                            <label className='m-1'>Password:</label>
                        </div>
                        <div className='col'>
                            <input type='password' className='form-control m-1' name='password' value={obj.password} placeholder='Enter your password' onChange={(e) => valueOnChange(e)} />
                            {errors.password === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.password}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col'>
                            <label className='m-1'>Confirm password:</label>
                        </div>
                        <div className='col'>
                            <input type='password' className='form-control m-1' name='confirmPassword' value={obj.confirmPassword} placeholder='Confirm your password' onChange={(e) => valueOnChange(e)} />
                            {errors.confirmPassword === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.confirmPassword}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col'>
                            <label className='m-1'>Hobbies</label>
                        </div>
                        <div className='col'>
                            <input type='checkbox' className='form-check-input m-1' name='hobbies' value='indoor' checked={obj.hobbies.includes('indoor')} onChange={(e) => valueOnChange(e)} />indoor <br />
                            <input type='checkbox' className='form-check-input m-1' name='hobbies' value='outdoor' checked={obj.hobbies.includes('outdoor')} onChange={(e) => valueOnChange(e)} />outdoor <br />
                            <input type='checkbox' className='form-check-input m-1' name='hobbies' value='music' checked={obj.hobbies.includes('music')} onChange={(e) => valueOnChange(e)} />music <br />
                            <input type='checkbox' className='form-check-input m-1' name='hobbies' value='reading' checked={obj.hobbies.includes('reading')} onChange={(e) => valueOnChange(e)} />reading <br />
                            <input type='checkbox' className='form-check-input m-1' name='hobbies' value='travelling' checked={obj.hobbies.includes('travelling')} onChange={(e) => valueOnChange(e)} />travelling <br />
                            {errors.hobbies === null ? (
                                null
                            ) : (
                                <><span className='text-danger'>{errors.hobbies}</span></>
                            )}
                        </div>
                    </div>

                    <div className='row border m-1 mt-1 justify-content-center align-items-center'>
                        <div className='col'>
                            <label className='m-1'>Information:</label>
                        </div>
                        <div className='col align-items-center'>
                            <textarea type='textarea' className='form-control m-1' name='information' value={obj.information} placeholder='Enter your relavent information' onChange={(e) => valueOnChange(e)} />
                            {errors.information === null ? (
                                null
                            ) : (
                                <><br /><span className='text-danger'>{errors.information}</span></>
                            )}
                        </div>
                    </div>

                    <button className='btn btn-primary m-2' type='submit'>Submit</button>
                </form>
                <div className='col-2'></div>
            </div>

            <div className='border m-3 bg-light rounded'>
                <h4>Table View:</h4>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Contact No.</th>
                            <th>Email Address</th>
                            <th>Hobbies</th>
                            <th>Information</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((item, key) => {
                            return <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.gender}</td>
                                <td>{item.contactNumber}</td>
                                <td>{item.emailAddress}</td>
                                <td>{item.hobbies.join(', ')}</td>
                                <td>{item.information}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyForm