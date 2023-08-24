import { useContext, useEffect } from 'react';
import { ButtonStyled } from '../GlobalStyles';
import { ErrorsStyled, InputStyled } from './FormStyled';
import { FormContext } from '../../context/FormContext';

const Form = () => {
    const { handleInputs, handleValidate, handleOnSubmit, setInputs, inputs, errors, editingStudent, idValue } =
        useContext(FormContext);

    useEffect(() => {
        if (!editingStudent) return;
        setInputs(editingStudent);
    }, [editingStudent, setInputs]);

    return (
        <div className='max-w-screen-lg mx-auto border'>
            <h1 className='text-center bg-slate-900 text-white text-2xl font-bold p-2 mb-0'>Thông tin sinh viên</h1>
            <form noValidate onSubmit={handleOnSubmit()} className='grid grid-rows-2 gap-4 p-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor=''>Mã sinh viên</label>
                        <InputStyled type='text' name='id' value={editingStudent ? inputs.id : idValue} disabled />
                        {errors.id && <ErrorsStyled>{errors.id}</ErrorsStyled>}
                    </div>
                    <div>
                        <label htmlFor=''>Họ và tên</label>
                        <InputStyled
                            type='text'
                            name='name'
                            value={inputs.name || ''}
                            spellCheck='false'
                            required
                            pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                            onChange={handleInputs()}
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
                            pattern='(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b'
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
