import { useEffect, useState } from "react"
import React from 'react'

const MyForm = () => {
    let firstObject = {
        id: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        emailAddress: "",
        hobbies: [],
        information: "",
    }

    let errors = {
        firstNameError: "",
        lastNameError: "",
        dateOfBirthError: "",
        genderError: "",
        contactError: "",
        emailError: "",
        hobbiesError: "",
        informationError: ""
    }

    let validationCount = 0;

    const [data, setData] = useState([])
    const [obj, setObj] = useState({ ...firstObject })
    const [id, setId] = useState(1);

    const valueOnChange = (e) => {
        switch (e.target.name) {
            case "firstName":
                setObj({ ...obj, [e.target.name]: e.target.value });

                firstNameValidation(e.target.value)
                break;

            case "lastName":
                setObj({ ...obj, [e.target.name]: e.target.value });

                lastNameValidation(e.target.value)
                break;

            case "dateOfBirth":
                setObj({ ...obj, [e.target.name]: e.target.value });

                dateofbirthNameValidation(e.target.value)
                break;

            case "gender":
                setObj({ ...obj, [e.target.name]: e.target.value });

                genderValidation(e.target.value)
                break;

            case "contactNumber":
                setObj({ ...obj, [e.target.name]: e.target.value });

                contactValidation(e.target.value)
                break;

            case "emailAddress":
                setObj({ ...obj, [e.target.name]: e.target.value });

                emailValidation(e.target.value)
                break;

            case "hobbies":
                if (e.target.checked) {
                    setObj({ ...obj, [e.target.name]: [...obj.hobbies, e.target.value], });
                } else {
                    let newHobby = obj.hobbies.filter(
                        (x) => x.hobbies === e.target.value
                    );
                    console.log('newHobby', newHobby)
                    setObj({ ...obj, [e.target.name]: [newHobby] });
                }
                hobbiesValidation(obj.hobbies)
                break;

            case "information":
                setObj({ ...obj, [e.target.name]: e.target.value });

                informationValidation(e.target.value)
                break;

            default:
                break;
        }

        // if (e.target.name === 'firstName') {
        //     setObj({ ...obj, [e.target.name]: e.target.value });
        // }
        // if (e.target.name === "hobbies") {
        //     console.log('hobby event', e)

        // } else {
        //     setObj({ ...obj, [e.target.name]: e.target.value });
        // }
    }

    const firstNameValidation = (fname) => {
        console.log('first name validation',)
        if (fname === "") {
            console.log('empty fname',)
            errors.firstNameError = 'Enter First Name';
        }
    }

    const lastNameValidation = (lname) => {
        if (lname === "") {
            errors.lastNameError = 'Enter Last Name';
        }
    }

    const dateofbirthNameValidation = (dob) => {
        if (dob === "") {
            errors.dateOfBirthError = 'Enter Birth Date';
        }
    }

    const genderValidation = (gender) => {
        if (gender === "") {
            errors.genderError = 'Choose your gender';
        }
    }

    const contactValidation = (contact) => {
        if (contact === "") {
            errors.contactError = 'Enter 10 digit number';
        }
    }

    const emailValidation = (email) => {
        if (email === "") {
            errors.emailError = 'Email field empty';
        }
    }

    const hobbiesValidation = (hobbies) => {
        if (hobbies.length < 3) {
            errors.hobbiesError = 'Choose atleast 3 hobbies';
        }
    }

    const informationValidation = (information) => {
        if (information === "") {
            errors.informationError = 'Invalid information';
        }
    }

    const submit = (e) => {
        e.preventDefault();

        obj.id = id
        setId(id + 1)
        console.log('obj', obj)
        data.push(obj)
        setData([...data])

        setObj(firstObject)
    };

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="row border rounded m-3 bg-light">
                <h4>Filter Options</h4>
                <div>First Name: <input type="text" name="filterFirstName" id="filterFname" /></div>
                <div>Last Name: <input type="text" name="filterLastName" id="filterLname" /></div>
                <div>E-mail address: <input type="text" name="filterEmail" id="filterEmail" /></div>
            </div>

            <div className='row m-0 mt-2 mb-2'>
                <div className="col-2"></div>
                <form onSubmit={submit} className="col-8 border rounded shadow">
                    <h4>Form: </h4>
                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col ">
                            <label className="m-1">First Name:</label>
                        </div>
                        <div className="col">
                            <input type="text" className='input' name="firstName" value={obj.firstName} placeholder='enter your first name' pattern="[A-Z][a-z]*" errormessage="First name should not contain numbers" onChange={(e) => valueOnChange(e)} />
                            {!(errors.firstNameError === "") ? <span className="text-danger">Enter First name</span> : null}                            {/* <span className="text-danger">{errors.firstNameError}</span> */}
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col ">
                            <label className="m-1"> Last Name:</label>
                        </div>
                        <div className="col">
                            <input type="text" className='input' name="lastName" value={obj.lastName} placeholder='enter your last name' pattern="[A-Z][a-z]*" errormessage="Last name should not contain numbers" onChange={(e) => valueOnChange(e)} />
                            <span className="text-danger">{errors.lastNameError}</span>
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col ">
                            <label className="m-1"> Date of birth:</label>
                        </div>
                        <div className="col">
                            <input type="date" className='input' name="dateOfBirth" value={obj.dateOfBirth} errormessage="Age should be greater than 18" onChange={(e) => valueOnChange(e)} />
                            <span className="text-danger">{errors.dateOfBirthError}</span>
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col ">
                            <label className="m-1"> Gender:</label>
                        </div>
                        <div className="col justify-content-begin text-begin align-items-center">
                            <input className="radio" type="radio" name="gender" value='male' checked={obj.gender==="male"} onChange={(e) => valueOnChange(e)} /> male <br />
                            <input className="radio" type="radio" name="gender" value='female'checked={obj.gender==="female"} onChange={(e) => valueOnChange(e)} /> female
                            <span className="text-danger">{errors.genderError}</span>
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col ">
                            <label className="m-1"> Contact No.:</label>
                        </div>
                        <div className="col">
                            <input type="tel" className='input' name="contactNumber" value={obj.contactNumber} placeholder='Enter 10 digit phone number' pattern="[0-9]{10}" errormessage="Phone number should be 10 digits long" onChange={(e) => valueOnChange(e)} />
                            <span className="text-danger">{errors.contactError}</span>
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col">
                            <label className="m-1"> Email address:</label>
                        </div>
                        <div className="col">
                            <input type="email" className='input' name="emailAddress" value={obj.emailAddress} placeholder='enter your email address' pattern="[a-z]*+@+(gmail|outlook)+(.com)" errormessage="Email address should contain @gmail.com or @outlook.com" onChange={(e) => valueOnChange(e)} />
                            <span className="text-danger">{errors.emailError}</span>
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col ">
                            <label className="m-1"> Hobbies</label>
                        </div>
                        <div className="col">
                            <input type="checkbox" className='input' name="hobbies" value='indoor' checked={obj.hobbies?.includes("indoor")} onChange={(e) => valueOnChange(e)} />indoor <br />
                            <input type="checkbox" className='input' name="hobbies" value='outdoor' checked={obj.hobbies?.includes("outdoor")} onChange={(e) => valueOnChange(e)} />outdoor <br />
                            <input type="checkbox" className='input' name="hobbies" value='music' checked={obj.hobbies?.includes("music")} onChange={(e) => valueOnChange(e)} />music <br />
                            <input type="checkbox" className='input' name="hobbies" value='reading' checked={obj.hobbies?.includes("reading")} onChange={(e) => valueOnChange(e)} />reading <br />
                            <input type="checkbox" className='input' name="hobbies" value='travelling' checked={obj.hobbies?.includes("travelling")} onChange={(e) => valueOnChange(e)} />travelling <br />
                            <span className="text-danger">{errors.hobbiesError}</span>
                        </div>
                    </div>

                    <div className="row border m-1 mt-1 justify-content-center align-items-center">
                        <div className="col">
                            <label className="m-1">Information:</label>
                        </div>
                        <div className="col">
                            <input type="text" className='input' name="information" placeholder='enter your relavent information' onChange={(e) => valueOnChange(e)} />
                            <span className="text-danger">{errors.informationError}</span>
                        </div>
                    </div>

                    <button className='btn btn-primary m-2' type="submit">Submit</button>
                </form>
                <div className="col-2"></div>
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
                            // const printHobby = JSON.stringify(item.hobbies, null, " ")
                            const printHobby = JSON.parse(JSON.stringify(item.hobbies, null, '\t'))
                            return <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.gender}</td>
                                <td>{item.contactNumber}</td>
                                <td>{item.emailAddress}</td>
                                <td>{printHobby}</td>
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