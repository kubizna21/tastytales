import { useEffect, useState } from "react";
import Styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css/skyblue'
import { Link } from "react-router-dom";

function Populer() {
  // the useState well hold an arry
  // the useState can be anything from array to numbers, it well get whatever data i want.
  const [populer, setPopuler] = useState([])


  useEffect(() => {
    getPopular();
    return() => {
      
    }
  }, []);

  const getPopular = async () => {

    // the code here well help with filltering the api
    const check = localStorage.getItem('popular');

// this checks if the data is saved to local storge
    if (check) {
      setPopuler(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`
      )
      const data = await api.json();

      localStorage.setItem('popular', JSON.stringify(data.recipes));
      console.log(data)
      setPopuler(data.recipes)
    };
  }


  return (
    <div>
      <Wraped>
        <h3>Most Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}>
          {populer.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
              <Sheet>
                <Link to={'/recipe/' + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt="{recipe.title}" />
                <Gradient />
                </Link>
              </Sheet>
            </SplideSlide>
            );
          })

          }
        </Splide>
      </Wraped>
    </div>
  );

}
const Wraped = Styled.div`
  margin: 4rem 0rem;
`;
// SHEET IS CARD
const Sheet = Styled.div`
  min-height: 25rem; /* Fixed typo: Changed min-hight to min-height */
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = Styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));



`;


export default Populer