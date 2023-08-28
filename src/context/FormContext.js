import React from 'react';
import { useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SVActions } from '../store/SinhVienReducer/slice';
import { toast } from 'react-toastify';

const FormContext = createContext();

const FormProvider = ({ children }) => {
    let [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [idValue, setIdValue] = useState(1);

    const dispatch = useDispatch();
    const { editingStudent, students } = useSelector(state => state.SVReducer);

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

        if (isTrue) {
            if (!editingStudent) {
                inputs = {
                    ...inputs,
                    id: idValue,
                };
                dispatch(SVActions.addStudent(inputs));
                setIdValue(pre => pre + 1);
                toast.success('Thêm sinh viên thành công!');
            } else {
                dispatch(SVActions.editStudent(inputs));
                dispatch(SVActions.searchStudent(undefined));
                toast.success('Chỉnh sửa thành công!');
            }
            // setInputs({});
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
        idValue,
    };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export { FormContext, FormProvider };
