import { useState } from 'react';
import { useHistory } from 'react-router';
import { postUserInfo } from '../api/user';
import Question from '../components/Question';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tool, setTool] = useState('Github');
  const [teamSize, setTeamSize] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const history = useHistory();
  const TOOLS = ['Github', 'Gitlab', 'BitBucket', 'TFS', 'Other'];
  const QUESTIONS = [
    {
      text: "We'd like to know more about you before you download our product! To start things off, what is your full name?",
      children: (
        <input
          className="question-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ),
      canProgress: name.length > 0,
    },
    {
      text: `Hello ${name} - nice to meet you! We'd love to have your email address as well: `,
      children: (
        <input
          className="question-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ),
      canProgress:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email.toLowerCase()
        ),
    },
    {
      text: `What's your favourite source control tool? If you can't find it in the list, select 'Other'.`,
      children: (
        <select
          className="question-input"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
        >
          {TOOLS.map((tool) => (
            <option className="question-option" key={tool} value={tool}>
              {tool}
            </option>
          ))}
        </select>
      ),
      canProgress: tool.length > 0,
    },
    {
      text: `Final question! Could you tell us how large your team is, roughly?`,
      children: (
        <input
          className="question-input"
          type="number"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
        />
      ),
      canProgress: teamSize > 0,
    },
    {
      text: `Unfortunately, our product is not quite ready yet - but you'll be the first to know if you submit the information you just provided!`,
      children: <></>,
      canProgress: true,
    },
  ];
  return (
    <div>
      <Question
        index={currentQuestion}
        text={QUESTIONS[currentQuestion].text}
        onNext={() => setCurrentQuestion(currentQuestion + 1)}
        onBack={() => setCurrentQuestion(currentQuestion - 1)}
        onSubmit={() => {
          postUserInfo({ name, email, tool, teamSize }).then(() => {
            history.push('/');
          });
        }}
        end={currentQuestion === QUESTIONS.length - 1}
        canProgress={QUESTIONS[currentQuestion].canProgress}
      >
        {QUESTIONS[currentQuestion].children}
      </Question>
    </div>
  );
};

export default Form;
