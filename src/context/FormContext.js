import React from 'react';
import { useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SVActions } from '../store/SinhVienReducer/slice';
import { toast } from 'react-toastify';

const FormContext = createContext();

const FormProvider = ({ children }) => {
    let [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { editingStudent, students } = useSelector(state => state.SVReducer);

    const validate = element => {
        const { valueMissing, patternMismatch } = element.validity;

        function isIDDuplicate(id) {
            if (editingStudent) return students.some(student => student.id === id && editingStudent.id !== id);
            return students.some(student => student.id === id);
        }

        let mess = '';
        if (valueMissing) {
            mess = 'Vui lòng nhập ô này';
        } else if (patternMismatch) {
            mess = 'Nhập sai cú pháp';
        } else if (element.name === 'id' && isIDDuplicate(element.value)) {
            mess = 'ID bị trùng lặp';
        }
        return mess;
    };

    const handleInputs = () => e => {
        const { value, name } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });

        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const handleValidate = () => e => {
        const mess = validate(e.target);
        setErrors({
            ...errors,
            [e.target.name]: mess,
        });
    };

    const handleOnSubmit = () => e => {
        e.preventDefault();
        const inputsNode = document.querySelectorAll('input[name]');

        let isTrue = true;
        let submitErrors = {};

        inputsNode.forEach(input => {
            const mess = validate(input);
            if (mess) {
                isTrue = false;
            }
            submitErrors = { ...submitErrors, [input.name]: mess };
        });
        setErrors(submitErrors);

        if (isTrue) {
            if (!editingStudent) {
                dispatch(SVActions.addStudent(inputs));
                toast.success('Thêm sinh viên thành công!');
            } else {
                dispatch(SVActions.editStudent(inputs));
                toast.success('Chỉnh sửa thành công!');
            }
            dispatch(SVActions.searchStudent(undefined));
            setInputs({});
        }
    };

    const value = {
        handleInputs,
        handleValidate,
        handleOnSubmit,
        setInputs,
        setErrors,
        inputs,
        errors,
        editingStudent,
        students,
    };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export { FormContext, FormProvider };
