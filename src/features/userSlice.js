import {createSlice, nanoid} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userData:null,
}

const userSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload);
            state.status=true,
            state.userData=action.payload;
        },
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        },
        // setUserPosts:(state,action)=>{
        //     state.posts = state.posts.push(action.payload);
        // },
        // deleteUserPost:(state,action)=>{
        //     state.posts = state.posts.filter(
        //         (post)=> (post.id !== action.payload));
        // },
        // updateUserPost:(state,action)=>{
        //     state.posts = state.posts.map((post)=> post.id===action.payload.id ? post=action.payload.post:post);
        // },
        // deleteAllPosts:(state,action)=>{
        //     state.posts=[];
        // }
    }
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;