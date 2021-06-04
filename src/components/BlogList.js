import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost, deletePost } from "../actions/posts";

import { InputGroup, FormControl, Card, Button, Modal } from "react-bootstrap";
export const BlogList = ({ post }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);
  const [updatePostData, setupdatePostData] = useState({
    title: post.title,
  });

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    dispatch(updatePost(post.id, updatePostData));
    // clear();
    // alert(post.title);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update a Post:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="AddArticle">
            <form>
              <InputGroup className="mb-3">
                <FormControl
                  name="title"
                  aria-describedby="basic-addon1"
                  onChange={(e) =>
                    setupdatePostData({
                      ...updatePostData,
                      title: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Title"
                  value={updatePostData.title}
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  name="body"
                  placeholder="body"
                  value={post.body}
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

      <Card
        style={{
          width: "18rem",
          height: "21rem",
          backgroundColor: "#eaffea",
        }}
        key={post.id}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "20px", height: "90px" }}>
            {post.title ? updatePostData.title : post.title}
          </Card.Title>
          <Card.Text style={{ fontSize: "15px", height: "153px" }}>
            {post.body}
          </Card.Text>
          <Button
            style={{ marginRight: "15px" }}
            variant="warning"
            onClick={handleShow}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => dispatch(deletePost(post.id))}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
