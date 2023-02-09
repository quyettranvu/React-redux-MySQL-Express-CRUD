import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialService from "../services/TutorialService";

const TutorialComponent = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  //on updating get id of tutorial at the link URL
  const getTutorial = (id) => {
    TutorialService.get(id)
      .then((res) => {
        setCurrentTutorial(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  //Việc sử dụng useEffect ở đây mang ý nghĩa khi component render(state cập nhật lại) thì luôn thay đổi tương ứng
  useEffect(() => {
    getTutorial(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  //Show publish or unpublish
  const updateStatus = (status) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    dispatch(updateTutorial(currentTutorial.id, data))
      .then((response) => {
        setCurrentTutorial({ ...currentTutorial, published: status });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTutorial(currentTutorial.id, currentTutorial))
      .then((res) => {
        console.log(res);

        setMessage("The tutorial was updated successfully!");
      })
      .catch((err) => console.log(err));
  };

  const removeTutorial = () => {
    dispatch(deleteTutorial(currentTutorial.id))
      .then(() => {
        navigate("/tutorials");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="btn btn-primary me-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="btn btn-primary me-3"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="btn btn-danger me-2" onClick={removeTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default TutorialComponent;
