import React, { useState } from 'react';
import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { filterByLength, filterBySubstring } from './utils.js';

function App() {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = (pressedButton) => {
    if (!value.trim().length) {
      setErrorMessage("You haven't entered anything");
    } else if (
      value.match('^[A-z]+$') &&
      pressedButton === 'filter-substring'
    ) {
      setErrorMessage('');
      filterBySubstring(value);
    } else if (!isNaN(value) && pressedButton === 'filter-length') {
      setErrorMessage('');
      filterByLength(value);
    } else {
      console.log(
        setErrorMessage(
          'Error! Enter the numbers and click on "By length" or enter a string and click "By substring"'
        )
      );
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <InputGroup className="input-field">
          <FormControl
            onChange={(e) => setValue(e.target.value)}
            placeholder="Input field"
            value={value}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => {
                handleClick('filter-length');
              }}
              className="filter-length"
            >
              By length
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                handleClick('filter-substring');
              }}
              className="filter-substring"
            >
              By substring
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup className="output-field">
          <InputGroup.Prepend>
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
          </InputGroup.Prepend>
          <FormControl placeholder="Output field" />
        </InputGroup>
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>
  );
}

export default App;
