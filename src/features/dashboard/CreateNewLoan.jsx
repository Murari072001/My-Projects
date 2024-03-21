import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useAddLoanMutation } from '../../services/jsonApi';

function CreateNewLoan() {
    const [createLoan]=useAddLoanMutation()
    var createCampaignForm = useFormik({
        initialValues:{
            firstname:'',
            lastname:'',
            age:'',
            phoneNumber:'',
            aadharNumber:'',
            accountNumber:'',
            loantype:'',
            weight:'',
            price:'',
            worth:'',
            loanAmount:'',
            tenure:'',
            intrest:'',
            emi:'',
            description:'',
            imgUrl:'',
            date:(new Date()).getTime()
        },
        onSubmit:(values)=>{
           console.log(values)
            createLoan(values).then((res)=>{console.log(res);})
        }

    })
  return (
    <div className='bg-light'>
        <div className='container'>
            <h1>Loan Details</h1>
            <form onSubmit={createCampaignForm.handleSubmit}>
                <input type="text" name='firstname' placeholder='Enter firstname' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="text" name='lastname' placeholder='Enter lastname' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" name='age' placeholder='Enter Age' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" name='phoneNumber' placeholder='Enter Phone Number' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" name='aadharNumber' placeholder='Enter Aadhar Number' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" name='accountNumber' placeholder='Enter Account Number' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="text" name='loantype' placeholder='Enter Loan Type' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='weight' placeholder='Enter Weight in Grams' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='price' placeholder="Enter Today's Price in Grams" onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='worth' placeholder='Enter Worth' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='loanAmount' placeholder='Enter Loan Amount' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='tenture' placeholder='Enter Tenture' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='intrest' placeholder='Enter Intrest in Percentage' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="number" step="any" name='emi' placeholder='Enter Every Month Installment' onChange={createCampaignForm.handleChange}/>
                <br />
                <textarea name="description"  cols="30" rows="2" placeholder='Enter Description' onChange={createCampaignForm.handleChange}></textarea>
                <br />
                <button>Sanction Loan</button>
            </form> 
        </div>
    </div>
  )
}

export default CreateNewLoan