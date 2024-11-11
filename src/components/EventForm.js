import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [liveStreamLink, setLiveStreamLink] = useState('');

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/events', { title, description, date, liveStreamLink });
            alert("Event created successfully");
            onEventCreated();
        } catch (error) {
            alert("Event creation failed");
        }
    };

    return (
        <form onSubmit={handleCreateEvent}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            <label>Date</label>
            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label>Live Stream Link</label>
            <input type="url" value={liveStreamLink} onChange={(e) => setLiveStreamLink(e.target.value)} />
            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;