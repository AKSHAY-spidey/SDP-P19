import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const Attendance = ({ eventId }) => {
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch attendance data
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`/api/events/${eventId}/attendance`);
                setAttendees(response.data.attendees);
            } catch (err) {
                setError('Failed to load attendance data');
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [eventId]);

    // Toggle attendance for an attendee
    const toggleAttendance = (id) => {
        setAttendees((prevAttendees) =>
            prevAttendees.map((attendee) =>
                attendee.id === id ? { ...attendee, attended: !attendee.attended } : attendee
            )
        );
    };

    // Prepare data for CSV export
    const headers = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Attended', key: 'attended' },
    ];

    const csvData = attendees.map((attendee) => ({
        name: attendee.name,
        email: attendee.email,
        attended: attendee.attended ? 'Yes' : 'No',
    }));

    if (loading) return <p>Loading attendance...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Attendance Sheet</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Attended</th>
                        <th>Toggle Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => (
                        <tr key={attendee.id}>
                            <td>{attendee.name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.attended ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => toggleAttendance(attendee.id)}>
                                    {attendee.attended ? 'Mark Absent' : 'Mark Attended'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CSVLink
                data={csvData}
                headers={headers}
                filename={`event-${eventId}-attendance.csv`}
                className="btn btn-primary"
                target="_blank"
            >
                Download CSV
            </CSVLink>
        </div>
    );
};

export default Attendance;