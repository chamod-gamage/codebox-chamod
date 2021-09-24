import CodeColumn from '../components/CodeColumn';
import { useHistory } from 'react-router';
const Landing = () => {
  const history = useHistory();
  return (
    <div className="landing">
      <CodeColumn />
      <CodeColumn />
      <CodeColumn />
      <div className="landing-text">
        <div>
          <h1>Welcome to</h1>
        </div>
        <div className="company">
          <h1>CodeBox</h1>
        </div>
        <div onClick={() => history.push('/form')}>
          <h2>Interested in our product?</h2>
        </div>
      </div>
      <CodeColumn />
      <CodeColumn />
      <CodeColumn />
    </div>
  );
};

export default Landing;
