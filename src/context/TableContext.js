import { createContext } from 'react';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SVActions } from '../store/SinhVienReducer/slice';
import { FormContext } from '../context';
import { toast } from 'react-toastify';

const TableContext = createContext();

const TableProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const { students, searchResults } = useSelector(state => state.SVReducer);
    const dispatch = useDispatch();
    const { setErrors, setInputs } = useContext(FormContext);

    const handleEdit = id => () => {
        dispatch(SVActions.getStudent(id));
        setErrors({});
    };

    const handleDelete = id => () => {
        dispatch(SVActions.deleteStudent(id));
        toast.error('Xóa sinh viên thành công!');
        
        dispatch(SVActions.searchStudent(undefined));
        dispatch(SVActions.getStudent(undefined));
        setInputs({});
    };

    const handleSearch = () => {
        dispatch(SVActions.searchStudent(searchValue));
    };

    const handleCancelSearch = () => {
        dispatch(SVActions.searchStudent());
        setSearchValue('');
    };

    const value = {
        searchValue,
        setSearchValue,
        searchResults,
        students,
        handleEdit,
        handleDelete,
        handleSearch,
        handleCancelSearch,
    };
    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export { TableContext, TableProvider };
