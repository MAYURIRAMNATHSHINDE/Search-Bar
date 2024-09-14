import React, { useState, useEffect } from 'react';
import './SearchPage.css'; 

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetch('/countries.json') 
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (e) => {
        const input = e.target.value || '';
        setSearchTerm(input);
        filterData(input);
    };

    const filterData = (input) => {
        if (!input) {
            setSuggestions([]);
            setSelectedItem(null);
            return;
        }

        const lowerCaseInput = input.toLowerCase();

        const newSuggestions = data.filter(item => {
            const country = item.country ? item.country.toLowerCase() : '';
            const capital = item.capital ? item.capital.toLowerCase() : '';
            return country.startsWith(lowerCaseInput) || capital.startsWith(lowerCaseInput);
        }).slice(0, 10);

        setSuggestions(newSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.country || suggestion.capital);
        setSuggestions([]);
        setSelectedItem(suggestion);
    };

    return (
        <div className="search-page">
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search by country or capital"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.country || suggestion.capital}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedItem && (
                <div className="result">
                    <h2>{selectedItem.country}</h2>
                    <p>Capital: {selectedItem.capital}</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
