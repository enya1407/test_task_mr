import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import { filterByLength, filterBySubstring } from './utils.js';
import getWords from './getWords';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dataFromServer, setDataFromServer] = useState(null);
  const [outputValue, setOutputValue] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getWords();
      setDataFromServer(data);
    }
    fetchData();
  }, []);

  const handleLengthFilterClick = useCallback(() => {
    if (!inputValue.trim().length) {
      setOutputValue('');
      setErrorMessage("You haven't entered anything");
    } else if (!isNaN(inputValue)) {
      setErrorMessage('');
      setOutputValue(filterByLength(inputValue, dataFromServer));
    } else {
      setOutputValue('');
      setErrorMessage(
        'Error! Enter the numbers and click on "By length" or enter a string and click "By substring"'
      );
    }
  }, [dataFromServer, inputValue]);

  const handleSubstringFilterClick = useCallback(() => {
    if (!inputValue.trim().length) {
      setOutputValue('');
      setErrorMessage("You haven't entered anything");
    } else if (inputValue.match(/^[A-z\s]+$/)) {
      setErrorMessage('');
      setOutputValue(filterBySubstring(inputValue, dataFromServer, checked));
    } else {
      setOutputValue('');
      setErrorMessage(
        'Error! Enter the numbers and click on "By length" or enter a string and click "By substring"'
      );
    }
  }, [dataFromServer, inputValue, checked]);

  const handleCheckboxClick = useCallback(
    (e) => setChecked(e.target.checked),
    []
  );
  const handleInputChange = useCallback(
    (e) => setInputValue(e.target.value),
    []
  );

  return (
    <div className="App">
      <div className="wrapper">
        <InputGroup className="input-field">
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              className="output-field"
              aria-label="Checkbox for following text input"
              onChange={handleCheckboxClick}
              checked={checked}
            />
          </InputGroup.Prepend>
          <FormControl
            onChange={handleInputChange}
            placeholder="Input field"
            value={inputValue}
          />
          <InputGroup.Append>
            <Button
              disabled={!dataFromServer}
              variant="outline-secondary"
              onClick={handleLengthFilterClick}
              className="filter-length"
            >
              By length
            </Button>
            <Button
              disabled={!dataFromServer}
              variant="outline-secondary"
              onClick={handleSubstringFilterClick}
              className="filter-substring"
            >
              By substring
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Form.Control
          className="output-field"
          as="textarea"
          placeholder="Output field"
          rows={10}
          value={outputValue === null ? '' : outputValue || 'no results'}
          disabled
        />
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>
  );
}

export default App;
