import { createSlice } from "@reduxjs/toolkit";


const postSlice= createSlice({
    name:'post',
    initialState:{
        allPost:[],
        singlePost:null,
        allUserPosts:[],
        searchPostByText:"",
        allAppliedPost:[],
        searchedQuery:"",
    },
    reducers:{
        setAllPost:(state,action)=>{
            state.allPost= action.payload
        },
        setSinglePost:(state,action)=>{
            state.singlePost= action.payload
        },
        setAllUserPosts:(state,action)=>{
            state.allUserPosts= action.payload
        },
        setsearchPostByText:(state,action)=>{
            state.searchPostByText= action.payload
        },
        setAllAppliedPost:(state,action)=>{
            state.allAppliedPost= action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery= action.payload
        },
    }
})
export const {setAllPost,setSinglePost,setAllUserPosts,setSearchPostByText,setAllAppliedPost,setSearchedQuery}=postSlice.actions
export default postSlice.reducer;