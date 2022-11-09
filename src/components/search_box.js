import React from "react";
import { useState } from "react";
import Search_logo from "../search.jpeg";

export default function search_box(props) {
  return (
    <form
      className="search_box"
      onSubmit={(e) => {
        props.func();
        e.preventDefault();
      }}>
      <span className="Search_row">
        <input
          type="text"
          className="TextInput"
          placeholder="Enter name of the city"
          onChange={props.handleTextChange}
        />
        <input
          type="image"
          alt="submit"
          src={Search_logo}
          className="SubmitBtn"
        />
      </span>
    </form>
  );
}
