import styled from 'styled-components'


export const Button = styled.button`
    border: 1px solid #616A94;
    width: fit-content;
    border-radius: 50px;
    padding: 15px 30px;
    text-decoration: none;
    color: white;
    background-color: rgb(144, 51, 144);
    transition: 0.3s;
    font-size: 1em;
    cursor: pointer;
    outline: none;
    align-self: center;
    &:hover {
        color: black;
        background-color: rgb(253, 68, 253);
    }
`;

export default Button