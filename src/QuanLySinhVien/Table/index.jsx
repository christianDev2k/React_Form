import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './table.module.scss';
import { ButtonStyled } from '../GlobalStyles';
import { SVActions } from '../../store/SinhVienReducer/slice';

const Table = () => {
    const { students } = useSelector(state => state.SVReducer);
    const dispatch = useDispatch();

    const handleDelete = id => () => {
        dispatch(SVActions.deleteStudent(id));
    };

    const handleEdit = id => () => {
        dispatch(SVActions.getStudent(id));
    };

    return (
        <div className='max-w-screen-lg mx-auto border mt-4'>
            <table className='w-full'>
                <thead className='bg-slate-900 text-white font-bold'>
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td className='text-center'>
                                <ButtonStyled className='mr-2' onClick={handleEdit(student.id)}>
                                    Sửa
                                </ButtonStyled>
                                <ButtonStyled type='danger' onClick={handleDelete(student.id)}>
                                    Xóa
                                </ButtonStyled>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
