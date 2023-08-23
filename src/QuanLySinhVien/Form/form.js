export const validate = element => {
    const { valueMissing, tooLong, tooShort, patternMismatch } = element.validity;

    let mess = '';
    if (valueMissing) {
        mess = 'Trường này là bắt buộc!';
    } else if (tooLong || tooShort) {
        mess = 'Trường này chỉ được phép 4 - 6 kí tự';
    } else if (patternMismatch) {
        mess = 'Nhập sai định dạng. Vui lòng nhập lại!';
    }

    return mess;
};
