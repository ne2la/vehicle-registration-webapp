import { FETCH_ALL,FETCH_POST, CREATE,UPDATE,DELETE,START_LOADING,END_LOADING,FETCH_PLATE_fORM,FETCH_PLATE_VALIDITY } from "../constants/actionTypes";

export default (state = { isLoading:true, posts: [],plateForm:'',plateValidity:false }, action) => {
    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading:true };

        case END_LOADING:
            return { ...state, isLoading:false };

        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};

        case UPDATE:    
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        
        case FETCH_ALL:    
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }

        case FETCH_POST:    
            return {...state, post: action.payload};

        case FETCH_PLATE_fORM:    
            return {...state, plateForm: action.payload};

        case FETCH_PLATE_VALIDITY:    
            return {...state, plateValidity: action.payload};

        case CREATE:
            return {...state, posts: [...state, action.payload]};

        default:
            return state;
    }
}