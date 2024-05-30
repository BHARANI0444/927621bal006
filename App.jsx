import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [numberId, setNumberId] = useState('e');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
                setResponse(res.data);
            } catch (err) {
                setError('Error fetching numbers. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [numberId]);

    const fetchNumbers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
            setResponse(res.data);
        } catch (err) {
            setError('Error fetching numbers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <div className="controls">
                <label htmlFor="numberType">Select Number Type: </label>
                <select
                    id="numberType"
                    value={numberId}
                    onChange={(e) => setNumberId(e.target.value)}
                >
                    <option value="p">Prime</option>
                    <option value="f">Fibonacci</option>
                    <option value="e">Even</option>
                    <option value="r">Random</option>
                </select>
                <button onClick={fetchNumbers} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Numbers'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {response && (
                <div className="response">
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
