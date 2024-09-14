import React, { useState } from 'react';
import './SearchBar.css';

const countries = [
    { name: "India", capital: "New Delhi" },
    { name: "United States", capital: "Washington D.C." },
    { name: "France", capital: "Paris" },
    { name: "Germany", capital: "Berlin" },
    { name: "Australia", capital: "Canberra" },
    { name: "Canada", capital: "Ottawa" },
];

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    const handleInputChange = (e) => {
        const input = e.target.value.toLowerCase();
        setSearchTerm(input);

        if (input === '') {
            setFilteredCountries([]);
            return;
        }

//////
        const handleInputChange = (e) => {
            const input = e.target.value.toLowerCase();
            setSearchTerm(input);
        
            if (input === '') {
                setFilteredData(data);
                return;
            }
        
            const filtered = data.filter(item => {
                // Ensure 'country' and 'capital' are defined before calling 'toLowerCase'
                const country = item.country ? item.country.toLowerCase() : '';
                const capital = item.capital ? item.capital.toLowerCase() : '';
                return country.includes(input) || capital.includes(input);
            });
            setFilteredData(filtered);
        };
      ////  

        // Filter countries based on name or capital
        // const filtered = countries.filter(country => 
        //     country.name.toLowerCase().includes(input) || 
        //     country.capital.toLowerCase().includes(input)
        // );
        // setFilteredCountries(filtered);
    };

    const handleSelectCountry = (countryName) => {
        setSearchTerm(countryName);
        setFilteredCountries([]); // Clear suggestions after selection
    };

    return (
        <div className="search-container">
            <input 
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search for countries or capitals..."
                className="search-bar"
            />
            {filteredCountries.length > 0 && (
                <ul className="suggestions">
                    {filteredCountries.map((country, index) => (
                        <li key={index} onClick={() => handleSelectCountry(country.name)}>
                            {country.name} (Capital: {country.capital})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
