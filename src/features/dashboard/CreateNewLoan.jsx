import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useAddLoanMutation, useLazySendOTPQuery } from '../../services/jsonApi';
import { useNavigate } from 'react-router-dom';

function CreateNewLoan() {
    const [createLoan] = useAddLoanMutation()
    const [otpfn]=useLazySendOTPQuery()
    let [OTP,setOTP]=useState('')
    const navigate = useNavigate()
    var createCampaignForm = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            age: '',
            email:'',
            phoneNumber: '',
            aadharNumber: '',
            accountNumber: '',
            loanType: '',
            weight: '',
            price: '',
            worth: '',
            loanAmount: '',
            tenure: '',
            interest: '',
            emi: '',
            emiPaid: [],
            description: '',
            imgUrl: '',
            password:'',
            date: (new Date()).getTime()
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("*This field is Required"),
            lastname: Yup.string().required("*This field is Required"),
            age: Yup.number().required("*This field is Required"),
            email:Yup.string().matches(/@/,"Not A valid emailID").required("*This field is Required"),
            phoneNumber: Yup.number().required("*This field is Required"),
            aadharNumber: Yup.number().required("*This field is Required"),
            accountNumber: Yup.number().required("*This field is Required"),
            loanType: Yup.string().required("*This field is Required"),
            weight: Yup.number().required("*This field is Required"),
            price: Yup.number().required("*This field is Required"),
            loanAmount: Yup.number().required("*This field is Required"),
            tenure: Yup.string().required("*This field is Required"),
            password:Yup.string().required().matches(OTP,"OTP not Matched"),
            description: Yup.string().required("*This field is Required")
        }),
        onSubmit: (values, {resetForm}) => {
            values.worth = createCampaignForm.values.weight * createCampaignForm.values.price
            values.interest = interestRate[0]
            values.emi = interestRate[1]
            console.log(values)
            createLoan(values).then((res) => {
                alert("Loan Sanctioned Successfully!!!")
                resetForm()
                navigate('/admindashboard')
            })
        }
    })
    const sendotp=()=>{
        // otpfn(createCampaignForm.values.email).then((res)=>{setOTP(res.data.OTP)}).catch((err)=>{console.log("err",err);})
    }
    const calculateEMI = (N) => {
        setinterest([N, (Math.floor(createCampaignForm.values.loanAmount * (N / 12 / 100) * ((1 + (N / 12 / 100)) ** createCampaignForm.values.tenure) / ((1 + (N / 12 / 100)) ** (createCampaignForm.values.tenure) - 1)))])
    }
    let [interestRate, setinterest] = React.useState([]);
    useEffect(() => {
        switch (createCampaignForm.values.tenure) {
            case "6": calculateEMI(15)
                break;
            case "8": calculateEMI(14.5)
                break;
            case "10": calculateEMI(14.15)
                break;
            case "12": calculateEMI(13.75)
                break;
            case "18": calculateEMI(13.05)
                break;
            case "24": calculateEMI(12.50)
                break;
            case "30": calculateEMI(11.99)
                break;
            case "36": calculateEMI(11.11)
                break;
            case "48": calculateEMI(10.25)
                break;
            case "60": calculateEMI(8.65)
                break;
            default: calculateEMI(18)
                break;
        }
    }, [createCampaignForm.values.tenure])
    return (
        <div className='bg-light'>
            <div className='container'>
                <h1>Loan Details</h1>
                <form onSubmit={createCampaignForm.handleSubmit}>
                    {createCampaignForm.touched.firstname && <h6 className='error'>{createCampaignForm.errors.firstname}</h6>}
                    <div className='form-floating'>
                        <input type="text" className='form-control' name='firstname' placeholder='Enter firstname' value={createCampaignForm.values.firstname} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="firstname">Enter Firstname</label>
                    </div>
                    {createCampaignForm.touched.lastname && <h6 className='error'>{createCampaignForm.errors.lastname}</h6>}
                    <div className='form-floating'>
                        <input type="text" className='form-control' name='lastname' placeholder='Enter lastname' value={createCampaignForm.values.lastname} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="lastname">Enter Lastname</label>
                    </div>
                    {createCampaignForm.touched.age && <h6 className='error'>{createCampaignForm.errors.age}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' name='age' placeholder='Enter Age' value={createCampaignForm.values.age} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="age">Enter Age</label>
                    </div>
                    {createCampaignForm.touched.email && <h6 className='error'>{createCampaignForm.errors.email}</h6>}
                    <div className="form-floating">
                        <input type="email" className='form-control' name='email' placeholder='Enter Email Address' value={createCampaignForm.values.email} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="email">Enter Email Address</label>
                    </div>
                    <div className="form-floating">
                         <button className='btn btn-outline-success w-100' onClick={()=>{sendotp()}}>Send OTP</button>
                    </div>
                    {createCampaignForm.touched.password && <h6 className='error'>{createCampaignForm.errors.password}</h6>}
                    <div className="form-floating">
                        <input type='text' className='form-control' name="password" placeholder='Enter OTP' value={createCampaignForm.values.password} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur}/>
                        <label htmlFor="otp">Enter OTP</label>
                    </div>
                    {createCampaignForm.touched.phoneNumber && <h6 className='error'>{createCampaignForm.errors.phoneNumber}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' name='phoneNumber' placeholder='Enter Phone Number' value={createCampaignForm.values.phoneNumber} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="phoneNumber">Enter Phone Number</label>
                    </div>
                    {createCampaignForm.touched.aadharNumber && <h6 className='error'>{createCampaignForm.errors.aadharNumber}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' name='aadharNumber' placeholder='Enter Aadhar Number' value={createCampaignForm.values.aadharNumber} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="aadharNumber">Enter Aadhar Number</label>
                    </div>
                    {createCampaignForm.touched.accountNumber && <h6 className='error'>{createCampaignForm.errors.accountNumber}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' name='accountNumber' placeholder='Enter Account Number' value={createCampaignForm.values.accountNumber} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="accountNumber">Enter Account Number</label>
                    </div>
                    {createCampaignForm.touched.loanType && <h6 className='error'>{createCampaignForm.errors.loanType}</h6>}
                    <div className="form-floating">
                        <input type="text" className='form-control' name='loanType' placeholder='Enter Loan Type' value={createCampaignForm.values.loanType} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="loanType">Enter Loan Type</label>
                    </div>
                    {createCampaignForm.touched.weight && <h6 className='error'>{createCampaignForm.errors.weight}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' step="any" name='weight' placeholder='Enter Weight in Grams' value={createCampaignForm.values.weight} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="weight">Enter Weight in Grams</label>
                    </div>
                    {createCampaignForm.touched.price && <h6 className='error'>{createCampaignForm.errors.price}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' step="any" name='price' placeholder="Enter Today's Price in Grams" value={createCampaignForm.values.price} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="price">Enter Today's Price in Grams</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" className='form-control' disabled value={createCampaignForm.values.weight * createCampaignForm.values.price} step="any" name='worth' placeholder='Enter Worth' onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="worth">Total Worth</label>
                    </div>
                    {createCampaignForm.touched.loanAmount && <h6 className='error'>{createCampaignForm.errors.loanAmount}</h6>}
                    <div className="form-floating">
                        <input type="number" className='form-control' step="any" name='loanAmount' placeholder='Enter Loan Amount' onKeyUp={() => { calculateEMI(createCampaignForm.values.tenure) }} value={createCampaignForm.values.loanAmount} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="loanAmount">Enter Loan Amount</label>
                    </div>
                    {createCampaignForm.touched.tenure && <h6 className='error'>{createCampaignForm.errors.tenure}</h6>}
                    <div className="form-floating">
                        <select className='form-control' name="tenure" id="tenure" value={createCampaignForm.values.tenure} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur}>
                            <option selected disabled>-- Please Select Tenure --</option>
                            <option value={6}>6 Months</option>
                            <option value={8}>8 Months</option>
                            <option value={10}>10 Months</option>
                            <option value={12}>12 Months</option>
                            <option value={18}>18 Months</option>
                            <option value={24}>24 Months</option>
                            <option value={30}>30 Months</option>
                            <option value={36}>36 Months</option>
                            <option value={48}>48 Months</option>
                            <option value={60}>60 Months</option>
                        </select>
                        <label htmlFor="tenure">Please Select Tenure</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type="number" step="any" name='interest' value={interestRate[0]} disabled placeholder='Enter interest in Percentage' onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="interest">Loan interest</label>
                    </div>
                    <div className="form-floating">
                        <input className='form-control' type="number" step="any" name='emi' value={interestRate[1]} placeholder='Enter Every Month Installment' onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur} />
                        <label htmlFor="emi">EMI Amount</label>
                    </div>
                    {createCampaignForm.touched.description && <h6 className='error'>{createCampaignForm.errors.description}</h6>}
                    <div className="form-floating">
                        <textarea className='form-control' name="description" cols="30" rows="2" placeholder='Enter Description' value={createCampaignForm.values.description} onChange={createCampaignForm.handleChange} onBlur={createCampaignForm.handleBlur}></textarea>
                        <label htmlFor="description">Enter Description</label>
                    </div>
                    <div className="form-floating">
                        <button type='submit' className='btn btn-outline-primary w-100 m-0'>Sanction Loan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewLoan