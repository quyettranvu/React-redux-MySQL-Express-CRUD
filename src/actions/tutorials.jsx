import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "./types";

import TutorialDataService from "../services/TutorialService";

//Dispatch from API response to Reducer in Store
export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await TutorialDataService.create({ title, description });

    dispatch({
      type: CREATE_TUTORIAL,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTutorials = () => async (dispatch) => {
  try {
    const res = await TutorialDataService.getAll();

    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateTutorial = (id, data) => async (dispatch) => {
  try {
    const res = await TutorialDataService.update(id, data);

    dispatch({
      type: UPDATE_TUTORIAL,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await TutorialDataService.remove(id);

    dispatch({
      type: DELETE_TUTORIAL,
      payload: { id },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    await TutorialDataService.delete();

    dispatch({
      type: DELETE_ALL_TUTORIALS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
  try {
    const res = await TutorialDataService.findByTitle(title);
    console.log(res.data);

    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
