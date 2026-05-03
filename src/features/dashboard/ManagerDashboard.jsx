import React, { useEffect, useState } from 'react';
import { useGetAllEmployeesQuery } from '../../Services/userApi';
import { useLazyListTicketsQuery, useUpdateTicketMutation } from '../../Services/ticketApi';
import StatsCard from '../../shared/StatsCard';
import { useNavigate } from 'react-router-dom';
import ManagerFilters from './ManagerFilters';
import ManagerTicketsTable from './ManagerTicketsTable';

function ManagerDashboard({ user }) {
  var { username } = user;
  var { isLoading: employeesLoading, data: employeesData } = useGetAllEmployeesQuery();
  var [selectedEmployeeId, setSelectedEmployeeId] = useState({});
  var [updatedTicketFn] = useUpdateTicketMutation();
  var [ticketsFn, { data, isLoading }] = useLazyListTicketsQuery();
  var [allpro, setAllpro] = useState([]);
  const navigate = useNavigate();
  
  var [sortObj, setObj] = useState({
    search: "",
    radio: "",
    checkbox: []
  });

  useEffect(() => {
    ticketsFn().then((res) => { if(res.data) setAllpro(res.data) });
  }, [ticketsFn]);

  function assignTicketToEmployee(tkt) {
    const empId = selectedEmployeeId[tkt.id];
    if (!empId || empId === "null") {
      alert("Please select an employee first");
      return;
    }
    var updatedTicket = { ...tkt, employeeId: parseInt(empId) };
    updatedTicketFn(updatedTicket).then(() => {
      alert("Ticket Assigned Successfully");
      ticketsFn().then((res) => { if(res.data) setAllpro(res.data) });
    });
  }

  function handleEmployeeSelect(ticketId, empId) {
    setSelectedEmployeeId({ ...selectedEmployeeId, [ticketId]: empId });
  }

  function search(e) {
    setObj({ ...sortObj, search: e.target.value });
    checkfilters({ ...sortObj, search: e.target.value });
  }

  function sortRadio(e) {
    setObj({ ...sortObj, radio: e.target.value });
    checkfilters({ ...sortObj, radio: e.target.value });
  }

  function sortCheckbox(e) {
    let checkArr = [...sortObj.checkbox];
    if (e.target.checked) {
      checkArr.push(e.target.value);
    } else {
      checkArr.splice(checkArr.indexOf(e.target.value), 1);
    }
    setObj({ ...sortObj, checkbox: checkArr });
    checkfilters({ ...sortObj, checkbox: checkArr });
  }

  function checkfilters(a) {
    let filterData = data || [];
    if (a.search) {
      filterData = filterData.filter((t) => t.issue.toLowerCase().includes(a.search.toLowerCase()));
    }
    if (a.radio) {
      filterData = filterData.filter((t) => t.status === a.radio);
    }
    if (a.checkbox.length) {
      filterData = filterData.filter((t) => a.checkbox.some((ele) => ele === t.IssueType));
    }
    setAllpro(filterData);
  }

  const totalTickets = data ? data.length : 0;
  const openTickets = data ? data.filter(t => t.status === 'ticketRaised' && !t.employeeId).length : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Manager Dashboard</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <input 
              type="text" 
              className="input-custom" 
              placeholder="Search issues..." 
              style={{ width: '250px' }} 
              onKeyUp={search}
           />
           <button className="btn-secondary-custom" onClick={() => navigate("/dashboard/users")}>
               Manage Users
           </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <StatsCard title="Total Tickets" value={totalTickets} icon="🎫" color="var(--accent-primary)" />
          <StatsCard title="Unassigned" value={openTickets} icon="⚠️" color="var(--accent-warning)" delay={100} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Extracted Filters Sidebar */}
        <ManagerFilters 
            sortObj={sortObj} 
            onSearch={search} 
            onRadioChange={sortRadio} 
            onCheckboxChange={sortCheckbox} 
        />

        {/* Extracted Tickets Table */}
        <ManagerTicketsTable 
            tickets={allpro}
            employeesData={employeesData}
            selectedEmployeeId={selectedEmployeeId}
            onEmployeeSelect={handleEmployeeSelect}
            onAssign={assignTicketToEmployee}
            isLoading={isLoading || employeesLoading}
        />

      </div>
    </div>
  );
}

export default ManagerDashboard;