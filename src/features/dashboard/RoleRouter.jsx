import React from 'react';
import CustomerDashboard from './CustomerDashboard';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import { useOutletContext } from 'react-router-dom';

function RoleRouter() {
    const { user } = useOutletContext();

    if (!user) return null;

    const { role } = user;

    return (
        <div className="animate-fade-in">
            {role === "customer" && <CustomerDashboard user={user} />}
            {role === "manager" && <ManagerDashboard user={user} />}
            {role === "employee" && <EmployeeDashboard user={user} />}
        </div>
    );
}

export default RoleRouter;
