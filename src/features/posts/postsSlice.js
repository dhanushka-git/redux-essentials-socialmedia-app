import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = [
    {id: '1', title: 'First Post', content: 'Hello world!', user:'0', date:'2022-09-19T16:32:29.354Z', reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}},
    {id: '2', title: 'Second Post', content: 'More and more text', user:'1', date:'2022-09-19T16:33:08.527Z', reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date:new Date().toISOString(),
                        title,
                        content,
                        user:userId
                    }
                }
            },

        },
        postUpdated(state, action) {
            const {id, title, content} = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
    state.posts.find(post => post.id === postId)
