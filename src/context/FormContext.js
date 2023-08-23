import React, { useEffect } from 'react';
import { useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SVActions } from '../store/SinhVienReducer/slice';

const FormContext = createContext();

const FormProvider = ({ children }) => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { editingStudent } = useSelector(state => state.SVReducer);

    const validate = element => {
        const { minLength, maxLength } = element;
        const { valueMissing, tooLong, tooShort, patternMismatch } = element.validity;

        let mess = '';
        if (valueMissing) {
            mess = 'Bạn nhập thiếu rồi nè!';
        } else if (tooLong || tooShort) {
            mess = `Ô này bạn nhập từ ${minLength} - ${maxLength} chữ số nha!`;
        } else if (patternMismatch) {
            mess = 'Bạn nhập sai format rồi. Nhập lại giúp tớ nhé!';
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

        if (!isTrue) return;

        if (!editingStudent) {
            dispatch(SVActions.addStudent(inputs));
        } else {
            dispatch(SVActions.editStudent(inputs));
        }
        setInputs({});
    };

    useEffect(() => {
        if (!editingStudent) return;
        setInputs(editingStudent);
    }, [editingStudent]);

    const value = {
        handleInputs,
        handleValidate,
        handleOnSubmit,
        inputs,
        errors,
        editingStudent
    };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export { FormContext, FormProvider };
