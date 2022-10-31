import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{ imageUrl: string; title: string; price: number }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6353c277e64783fa82783516.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('ошибка получения питцы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>'Loading....'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} р.</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam ad architecto blanditiis
        dolorum mollitia quisquam impedit, cumque consequatur facere delectus laudantium itaque
        error. Quisquam corrupti nostrum quo, facere temporibus voluptate?
      </p>
    </div>
  );
};

export default FullPizza;
