import styled from 'styled-components';

export const InputStyled = styled.input`
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px 16px;
    width: 100%;
    margin-top: 8px;
`;

export const ErrorsStyled = styled.small`
    font-size: 14px;
    color: rgba(255, 0, 0, 0.8);
`;

export const validate = element => {
    const { valueMissing, tooLong, tooShort, patternMismatch } = element.validity;

    let mess = '';
    if (valueMissing) {
        mess = 'Trường này là bắt buộc!';
    } else if (tooLong || tooShort) {
        mess = 'Trường này gồm 4 - 6 chữ số';
    } else if (patternMismatch) {
        mess = 'Bạn nhập không đúng format. Vui lòng nhập lại!';
    }

    return mess;
};
