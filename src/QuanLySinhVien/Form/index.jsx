import React, { useEffect, useState } from 'react';
import { ButtonStyled } from '../GlobalStyles';
import styled from 'styled-components';
import { validate } from './form';
import { useDispatch, useSelector } from 'react-redux';
import { SVActions } from '../../store/SinhVienReducer/slice';

const InputStyled = styled.input`
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px 16px;
    width: 100%;
    margin-top: 8px;
`;

const ErrorsStyled = styled.small`
    font-size: 14px;
    color: rgba(255, 0, 0, 0.8);
`;

const Form = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { editingStudent } = useSelector(state => state.SVReducer);

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

    console.log(inputs);

    return (
        <div className='max-w-screen-lg mx-auto border'>
            <h1 className='text-center bg-slate-900 text-white text-2xl font-bold p-2 mb-0'>Thông tin sinh viên</h1>
            <form noValidate onSubmit={handleOnSubmit()} className='grid grid-rows-2 gap-4 p-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor=''>Mã sinh viên</label>
                        <InputStyled
                            type='text'
                            name='id'
                            value={inputs.id || ''}
                            required
                            disabled={!!editingStudent}
                            minLength={4}
                            maxLength={6}
                            pattern='^[0-9]*$'
                            onChange={handleInputs()}
                            onBlur={handleValidate()}
                        />
                        {errors.id && <ErrorsStyled>{errors.id}</ErrorsStyled>}
                    </div>
                    <div>
                        <label htmlFor=''>Họ và tên</label>
                        <InputStyled
                            type='text'
                            name='name'
                            spellCheck='false'
                            required
                            pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                            onChange={handleInputs()}
                            value={inputs.name || ''}
                            onBlur={handleValidate()}
                        />
                        {errors.name && <ErrorsStyled>{errors.name}</ErrorsStyled>}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor=''>Số điện thoại</label>
                        <InputStyled
                            type='text'
                            name='phone'
                            value={inputs.phone || ''}
                            required
                            pattern='^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'
                            onChange={handleInputs()}
                            onBlur={handleValidate()}
                        />
                        {errors.phone && <ErrorsStyled>{errors.phone}</ErrorsStyled>}
                    </div>
                    <div>
                        <label htmlFor=''>Email</label>
                        <InputStyled
                            type='text'
                            name='email'
                            required
                            value={inputs.email || ''}
                            pattern='^[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$'
                            onChange={handleInputs()}
                            onBlur={handleValidate()}
                        />
                        {errors.email && <ErrorsStyled>{errors.email}</ErrorsStyled>}
                    </div>
                </div>
                <div>
                    <ButtonStyled type={editingStudent ? 'danger' : null}>
                        {!editingStudent ? 'Thêm sinh viên' : 'Cập nhật sinh viên'}
                    </ButtonStyled>
                </div>
            </form>
        </div>
    );
};

export default Form;
