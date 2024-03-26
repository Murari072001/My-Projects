import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAllLoansQuery } from '../../services/jsonApi'

function AdminDashboard() {
  const { data, isLoading } = useAllLoansQuery()
  const [time, setDate] = useState('')
  const navigate=useNavigate()
  useEffect(() => {
    let temp = new Date()
    setDate(new Date(temp.getFullYear(), temp.getMonth(), 1, 0, 0, 0))
  }, [])
  return (
    <div className='bg-light'>
      <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><h1 className='bi bi-list'></h1></button>

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Services</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">

          <button className='bg-transparent btn  w-100  mt-2'>Services</button>
          <button className='bg-transparent btn  w-100  mt-2'>Total Accounts</button>
          <button className='bg-transparent btn  w-100  mt-2'>Total Amount Recovered</button>

        </div>
      </div>
      <div className='container'>
        <h1>Admin Dashboard</h1>
        <Link className='btn btn-success m-2' to="/createNewLoan"> + Create New Loan</Link>
        <Link className='btn btn-secondary m-2' to="allLoans">Show All Loan Candidates</Link>
        <div className='dashboard d-flex flex-wrap justify-content-around'>
          <div className="card AD" onClick={()=>{navigate("sanctionedLoans")}}>
            <h5>Total Loans Sanctioned This Month - {data?.filter((ele) => ele.date > time).length}</h5>
            <h6></h6>
          </div>
          <div className="card AD" onClick={()=>{navigate("EMI")}}>
            <h5>Total Amount Received This Month - ₹{data?.reduce((a, b) => {
              return a + b.emiPaid.reduce((a, b) => {
                if (b.paidOn > time)
                  return a + b.emiAmount
                else
                  return a
              }, 0)
            }, 0).toLocaleString("en-IN")}</h5>
          </div>
          <div className="card AD" onClick={()=>{navigate("EMI")}}>
            <h5>Pending EMI's - {data?.filter((ele) => ele.emiPaid[ele.emiPaid.length-1]?.paidOn<time).length}</h5>
          </div>
          <div className="card AD">
            <h5>Cleared Loans</h5>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default AdminDashboard