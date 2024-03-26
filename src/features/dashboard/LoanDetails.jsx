import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoanDetailsQuery } from "../../services/jsonApi";

const LoaDetails = () => {
    const params = useParams()
    console.log(params);
    const { data, isLoading } = useLoanDetailsQuery(params.loanId)
    
    function checkDate(date)
    {
        let time=new Date(date)
        return `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
    }

    return (
        <div>
            {
                data && <table id="loanDetails" className="table border border-3 border-dark m-3 table-hover table-striped w-50 ms-auto me-auto">
                    <tbody>
                        <tr>
                            <td>FirstName</td>
                            <td>{data.firstname}</td>
                        </tr>
                        <tr>
                            <td>LastName</td>
                            <td>{data.lastname}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{data.age}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{data.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Account Number</td>
                            <td>{data.accountNumber}</td>
                        </tr>
                        <tr>
                            <td>Aadhar Number</td>
                            <td>{data.aadharNumber}</td>
                        </tr>
                        <tr>
                            <td>Loan Issued On</td>
                            <td>{checkDate(data.date)}</td>
                        </tr>
                        <tr>
                            <td>LoanType</td>
                            <td>{data.loanType}</td>
                        </tr>
                        <tr>
                            <td>Loan Amount</td>
                            <td>₹{data.loanAmount.toLocaleString("en-IN")}</td>
                        </tr>
                        <tr>
                            <td>Interest p.a</td>
                            <td>{data.interest}</td>
                        </tr>
                        <tr>
                            <td>Tenure</td>
                            <td>{data.tenure}</td>
                        </tr>
                        <tr>
                            <td>EMI</td>
                            <td>{data.emi}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{data.description}</td>
                        </tr>
                        <tr>
                            <td>EMI's Paid</td>
                            <td><table className="table table-secondary table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th className="border border-dark">EMI Amount</th>
                                                <th className="border border-dark">Paid On Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    {data.emiPaid.map((emi)=>{ 
                                        return <tr>
                                            <td className="border border-dark">{checkDate(emi.paidOn)}</td>
                                            <td className="border border-dark">{emi.emiAmount}</td>
                                            </tr>
                                        })
                                    }</tbody>
                                    </table></td>
                        </tr>
                        
                    </tbody>
                </table>
            }
        </div>
    )
}

export default LoaDetails