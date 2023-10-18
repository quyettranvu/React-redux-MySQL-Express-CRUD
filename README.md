# React-redux-MySQL-Express-CRUD
Fullstack Application using Redux, ORM Sequelize, Express Server and Database MySQL

Learning about basics and understanding about how React Redux works in a full-stack application, also benefit of using ORM in developing backend on Nodejs. 

Notes:
-To set up connections with MySQL we are going to put in a folder called "config".
-To use successful connections for Vite React we need to set up proxy for its file(like we did before in React(in file package.json):
server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",  //our backend port 
        changeOrigin: true,  //allow to change origin 
        secure: false,       //no requirements for encrypted access 
        ws: true,            //allow websocket 
      },
    },
  },
And also cors-headers options in Nodejs:
var corsOptions = {
  origin: "http://localhost:5173",  //though here we can add other options (more at: https://www.npmjs.com/package/cors)
};

//enable cors with provided option access to front-end
app.use(cors(corsOptions));


#  COMPARE WITH USING REDUX TOOLKIT 
import {
  createReducer,
  createAction,
  current,
  nanoid,
  createSlice,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit'
import axios from 'axios'
import { initalPostList } from 'constants/blog'
import { Post } from 'types/blog.type'
import http from 'utils/http'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null
}

/* use createReducer and createAction */
// export const addPost = createAction<Post>("/blog/addPost")
// // export const addPost = createAction("/blog/addPost", function (post: Omit<Post, "id">) {
// //   return {
// //     payload: {
// //       ...post,
// //       id: nanoid()
// //     }
// //   }
// // })
// export const startEditingPost = createAction<string>("/blog/startEditingPost")
// export const deletePost = createAction<string>("/blog/deletePost")
// export const cancelEditingPost = createAction("/blog/cancelEditingPost")
// export const finishEditingPost = createAction<Post>("/blog/finishEditingPost")

// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addPost, (state, action) => {
//       //Immer js helps us to mutate safely
//       const post = action.payload
//       state.postList.push(post)
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const postId = action.payload
//       const foundPost = state.postList.find((post) => post.id === postId) || null
//       state.editingPost = foundPost
//     })
//     .addCase(deletePost, (state, action) => {
//       const postId = action.payload
//       const findPostIndex = state.postList.findIndex((post) => post.id === postId)
//       if (findPostIndex !== -1) {
//         state.postList.splice(findPostIndex, 1)
//       }
//     })
//     .addCase(cancelEditingPost, (state) => {
//       state.editingPost = null
//     })
//     .addCase(finishEditingPost, (state, action) => {
//       const postId = action.payload.id
//       state.postList.some((post, index) => {
//         if (post.id === postId) {
//           state.postList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     })
//     .addMatcher(
//       (action) => action.type.includes("cancel"),
//       (state) => {
//         current(state)
//       }
//     )
//   // .addDefaultCase((state, action)=>{})
// })

// export default blogReducer

/* Handle asynchronous events with createAsyncThunk */
export const fetchPostList = createAsyncThunk('blog/fetchPostList', async (_, thunkApi) => {
  const response = await http.get<Post[]>('/posts')
  return response.data
})

export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<Post, 'id'>, thunkApi) => {
  const response = await http.post<Post>('/posts', body)
  return response.data
})

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: string; body: Post }, thunkApi) => {
    try {
      const response = await http.put(`/posts/${postId}`, body)
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422)
        return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deletePost = createAsyncThunk('blog/deletePost', async (postId: string, thunkApi) => {
  const repsonse = await http.delete<Post>(`/posts/${postId}`)
  return repsonse.data
})

/* Use createSlice */
//If have async request then use with createAsyncThunk(simplify this process)
// const fetchUserDatawithId = createAsyncThunk("/user/fetchId", async (userId, thunkAPI) => {
//   const response = await userAPI.fetchById(userId)
//   return response.data
// })
export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    },
    // addPost: {
    //   reducer: (state, action: PayloadAction<Post>) => {
    //     const post = action.payload
    //     state.postList.push(post)
    //   },
    //   prepare: (post: Omit<Post, 'id'>) => ({
    //     payload: {
    //       ...post,
    //       id: nanoid()
    //     }
    //   })
    // },
    // deletePost: (state, action: PayloadAction<string>) => {
    //   const postId = action.payload
    //   const findPostIndex = state.postList.findIndex((post) => post.id === postId)
    //   if (findPostIndex !== -1) {
    //     state.postList.splice(findPostIndex, 1)
    //   }
    // },
    cancelEditingPost: (state) => {
      state.editingPost = null
    }
    // finishEditingPost: (state, action: PayloadAction<Post>) => {
    //   const postId = action.payload.id
    //   state.postList.some((post, index) => {
    //     if (post.id === postId) {
    //       state.postList[index] = action.payload
    //       return true
    //     }
    //     return false
    //   })
    //   state.editingPost = null
    // }
  },
  extraReducers: (builder) => {
    builder
      //async request
      // .addCase(fetchUserDatawithId.fulfilled, (state, action) => {
      //   state.postList.push(action.payload)
      // })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const postId = action.payload.id
        state.postList.some((post, index) => {
          if (post.id === postId) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.meta.arg //get postId
        const findPostIndex = state.postList.findIndex((post) => post.id === postId)
        if (findPostIndex !== -1) {
          state.postList.splice(findPostIndex, 1)
        }
      })
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state) => current(state)
      )
      .addDefaultCase((state, action) => {
        console.log(`Action type: ${action.type} and current state: ${current(state)}`)
      })
  }
})

export const { cancelEditingPost, startEditingPost } = blogSlice.actions
const blogReducer = blogSlice.reducer

export default blogReducer



