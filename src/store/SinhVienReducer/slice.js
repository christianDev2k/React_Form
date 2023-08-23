import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    editingStudent: undefined,
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
            let student = state.students.filter(student => student.id === payload);
            state.editingStudent = student[0];
        },
    },
});

export const { reducer: SVReducer, actions: SVActions } = SinhVienReducer;
