import styled from 'styled-components';

export const ButtonStyled = styled.button`
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.25s;
    color: #fff;
    border: 1px solid transparent;
    &:hover {
        opacity: 0.8;
    }
    ${props =>
        props.type === 'danger'
            ? `
            background-color: rgb(225, 29, 72); 
            border-color: rgb(225, 29, 72);`
            : `
            background-color: rgb(21 128 61); 
            border-color: rgb(21 128 61)`};
`;
