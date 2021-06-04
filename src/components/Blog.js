import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { createPost } from "../actions/posts";

import { BlogList } from "./BlogList";

export const Blog = () => {
  const dispatch = useDispatch();

  // Modal handling
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  //
  // Live search
  const [searchValue, setSearchValue] = useState("");

  const onchangeHandler = async (e) => {
    setSearchValue(e.target.value);
  };

  const liveSearch = ({ title }) => {
    // console.log(name);
    return title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };
  //

  // Redux consuming Data
  const posts = useSelector((state) => state.posts);
  // console.log(posts);
  //

  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    dispatch(createPost(postData));
    clear();
    // console.log(postData);
  };
  const clear = () => {
    setPostData({
      title: "",
      body: "",
    });
  };
  return !posts.length ? (
    <p>Loading...</p>
  ) : (
    <Container>
      <h1>My Blog</h1>
      {/* Adding new post Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding new Post:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="AddArticle">
            <form>
              <InputGroup className="mb-3">
                <FormControl
                  name="title"
                  aria-describedby="basic-addon1"
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                  type="text"
                  placeholder="Title"
                  value={postData.title}
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  name="body"
                  onChange={(e) =>
                    setPostData({ ...postData, body: e.target.value })
                  }
                  placeholder="body"
                  value={postData.body}
                  as="textarea"
                  aria-label="With textarea"
                />
              </InputGroup>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type in order to search"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={onchangeHandler}
        />
        <Button variant="success" onClick={handleShow}>
          New Post
        </Button>
      </InputGroup>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "15px",
          gridTemplateAreas: " '. . . . ' '. . . . ' '. . . . ' ",
        }}
      >
        {!posts.filter(liveSearch).length && (
          <h4>There's no post by that Title !!</h4>
        )}
        {posts.filter(liveSearch).map((post) => (
          <BlogList post={post} />
        ))}
      </div>
    </Container>
  );
};
