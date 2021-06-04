import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Blog } from "./components/Blog";
import { getPosts } from "./actions/posts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  });

  return (
    <div className="App">
      <Blog />
    </div>
  );
}

export default App;
