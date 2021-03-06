// import everything from api
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING} from '../constants/actionTypes';
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

export const getPosts = (page) => async (dispatch) => {
    
    try {

        // start loading
        dispatch({ type: START_LOADING });

        // fetch the data from api
        const { data } = await api.fetchPosts(page);
        console.log("actions: posts", data)

        // sending data through action.payload (actual posts)
        dispatch({ type: FETCH_ALL, payload: data });

        // end loading
        dispatch({type: END_LOADING});
        
    } catch (error) {
        console.log(error);
    }

}

// fetch one post based on the id
export const getPost = (id) => async (dispatch) => {
    
    try {

        // start loading
        dispatch({ type: START_LOADING });

        // fetch the data from api
        const { data } = await api.fetchPost(id);
        // console.log("actions: posts", data)

        // sending data through action.payload (actual posts)
        dispatch({ type: FETCH_POST, payload: data });

        // end loading
        dispatch({type: END_LOADING});
        
    } catch (error) {
        console.log(error);
    }

}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data }); // sending the data to reducers
    
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
}


export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);

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

export const deletePost = (id, history) => async (dispatch) => {
    
    try {
        await api.deletePost(id);

        history.go(0);

        dispatch ({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error);
    }

}

export const likePost = (id) => async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        // api request returns updated post
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: LIKE, payload: data });

    } catch (error) {
        console.log(error);
    }

}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        // server commentPost in posts.js in controllers sends "updatedPost" back 
        const { data } = await api.commentPost(value, id);
        // console.log(data); // should return new post with comments: ['comments']

        dispatch({ type: COMMENT, payload: data });

        return data.comments;

    } catch (error) {
        console.log(error);
    }
}

