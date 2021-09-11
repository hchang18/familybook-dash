// import everything from api
import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api';

// Action Creators : function that return action

// const getPosts = () => {
//     const action = { type: 'FETCH_ALL', payload: [] }
    
//     return action; 
// }

// we are working with asynchronous data
// it takes time to fetch all the data
// this is where redux-thunk comes

// const getPosts = () => async(dispatch) => {
    
//     const action = { type: 'FETCH_ALL', payload: [] }
    
//     dispatch(action);
// }


// put it in a try catch block

export const getPosts = () => async (dispatch) => {
    
    try {

        // fetch the data from api
        const { data } = await api.fetchPosts();

        // sending data through action.payload (actual posts)
        dispatch({ type: FETCH_ALL, payload: data });
        
    } catch (error) {
        console.log(error);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // api request returns updated post
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }

}

export const deletePost = (id) => async (dispatch) => {
    
    try {
        await api.deletePost(id);

        dispatch ({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error);
    }

}

export const likePost = (id) => async (dispatch) => {
    try {
        // api request returns updated post
        const { data } = await api.likePost(id);

        dispatch({ type: 'LIKE', payload: data });

    } catch (error) {
        console.log(error);
    }

}