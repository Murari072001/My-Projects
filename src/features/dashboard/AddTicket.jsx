import { useFormik } from 'formik';
import React from 'react';
import { useAddTicketMutation, useLazyListTicketsQuery } from '../../Services/ticketApi';
import { useNavigate } from 'react-router-dom';

function AddTicket() {
    var [addTicketFn] = useAddTicketMutation();
    var [getListTickets] = useLazyListTicketsQuery();
    var navigate = useNavigate();

    var ticketForm = useFormik({
        initialValues: {
            issue: "",
            IssueType: "",
            image: "",
            date: Date.now(),
            customerId: JSON.parse(window.localStorage.getItem("user"))[0].id,
            customerName: JSON.parse(window.localStorage.getItem("user"))[0].username,
            status: "ticketRaised"
        },
        onSubmit: (values) => {
            addTicketFn(values).then(() => {
                navigate("/dashboard/listTickets");
                getListTickets();
            }).catch((err) => {
                alert(JSON.stringify(err));
            });
        }
    });

    return (
        <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>Raise a New Ticket</h4>
            
            <form onSubmit={ticketForm.handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="issue" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Describe the Issue</label>
                    <textarea 
                        name="issue" 
                        id="issue" 
                        onChange={ticketForm.handleChange}
                        className="input-custom" 
                        rows="4"
                        placeholder="Please provide details about your issue..."
                        required
                    ></textarea>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <label htmlFor="IssueType" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Issue Type</label>
                    <input 
                        type="text" 
                        name="IssueType" 
                        id="IssueType" 
                        onChange={ticketForm.handleChange}
                        className="input-custom"
                        placeholder="e.g. Hardware, Software, Billing"
                        required
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-secondary-custom" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="btn-primary-custom">Submit Ticket</button>
                </div>
            </form>
        </div>
    );
}

export default AddTicket;