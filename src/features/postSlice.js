import {createSlice, nanoid} from "@reduxjs/toolkit"

const initialState = {
    posts:[],
}

export const postSlice = createSlice({
    name:"postAuth",
    initialState,
    reducers:{
        setPosts: (state,action)=>{
            state.posts = action.payload;  
        },
        addPost: (state,action)=>{
            state.posts = state.posts.push(action.payload);  
        },
        deletePost:(state,action)=>{
            state.posts = state.posts.filter(
                (post)=> (post.id !== action.payload));
        },
        updatePost:(state,action)=>{
            state.posts = state.posts.map((post)=> post.id===action.payload.id ? action.payload : post);
        },
    }
})

export const {setPosts, deletePost, updatePost, addPost} = postSlice.actions

export default postSlice.reducer