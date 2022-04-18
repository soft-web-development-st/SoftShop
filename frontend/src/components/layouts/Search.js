import React from "react";
import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import { useHistory } from "react-router-dom";



const Search = () => {
    const [keyword, setKeyword] = useState("");
    
    const history = useHistory();

  const searchHandler = (e) => {
      e.preventDefault();
      
     
      if (keyword.trim()) {
          history.push(`/search/${keyword}`) 
          setKeyword('')
      } else {
          history.push('/')
      }
  };
  return (
    <Form onSubmit={searchHandler} className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={searchHandler} variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default Search;
