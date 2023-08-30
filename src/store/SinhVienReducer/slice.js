import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    editingStudent: undefined,
    searchResults: undefined,
};

const SinhVienReducer = createSlice({
    name: 'SinhVienReducer',
    initialState,
    reducers: {
        addStudent: (state, { payload }) => {
            state.students = [...state.students, payload];
        },
        deleteStudent: (state, { payload }) => {
            state.students = state.students.filter(student => student.id !== payload);
        },
        editStudent: (state, { payload }) => {
            state.students = state.students.map(student => {
                if (student.id === payload.id) return payload;
                return student;
            });
            state.editingStudent = undefined;
        },
        getStudent: (state, { payload }) => {
            if (payload) {
                const index = state.students.findIndex(student => student.id === payload);
                state.editingStudent = state.students[index];
            } else {
                state.editingStudent = undefined;
            }
        },
        searchStudent: (state, { payload }) => {
            if (payload) {
                state.searchResults = state.students.filter(student =>
                    student.name.toLowerCase().includes(payload.toLowerCase())
                );
            } else {
                state.searchResults = undefined;
            }
        },
    },
});

export const { reducer: SVReducer, actions: SVActions } = SinhVienReducer;
