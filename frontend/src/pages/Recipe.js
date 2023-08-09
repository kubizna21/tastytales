import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({}); 

  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async () => {
    
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
      const detailData = await data.json();
      setDetails(detailData);
    }

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      {!!details.title && ( // Use nullish coalescing operator for conditional rendering
        <div>
          <h4>{details.title}</h4>
          <img src={details.image} alt='' />
        </div>
      )}
      <Info>
        <Button className={activeTab === "instructions" ? 'active' : ""} onClick={() => setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === "ingredients" ? 'active' : ""} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' && details.summary && ( 
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }} />
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }} />
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => 
              <li key={ingredient.id}>{ingredient.original}</li>
            )}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

// ... Styled components and other code remain the same ...


const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(to right, #f27121, #e94057);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.div`
  padding: 1rem 1rem; 
  color: white; 
  background: linear-gradient(35deg, #494949, #313131);
  border: 2px solid black; 

`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
