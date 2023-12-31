import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import React from 'react';

function Tags() {
  return (
    <List>
      <Slink to={'/cuisine/italian'}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </Slink>
      <Slink to={'/cuisine/american'}>
        <FaHamburger />
        <h4>American</h4>
      </Slink>
      <Slink to={'/cuisine/thai'}>
        <GiNoodles />
        <h4>Thai</h4>
      </Slink>
      <Slink to={'/cuisine/japanese'}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </Slink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;
const Slink = styled(NavLink)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 50%;
margin-right: 2rem;
text-decoration: none;
width: 6rem;
height: 6rem;
cursor: pointer;
transform: scale(0.9);
background: linear-gradient(35deg, #494949, #313131);

h4{
  color:white
}
svg{
  color: white;
  font-size: 1.5rem;
}
&.active{
  background: linear-gradient(to right, #f27121, #e94057);

  svg{
  color: white;
}
h4{
  color: white;
}
}


`
export default Tags;
