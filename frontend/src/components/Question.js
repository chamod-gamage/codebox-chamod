import { useHistory } from 'react-router';
const Question = ({
  index,
  text,
  children,
  onBack,
  onNext,
  onSubmit = () => {},
  canProgress = false,
  end = false,
}) => {
  const history = useHistory();
  return (
    <div className="question">
      <div className="question-index">{index + 1}</div>
      <div>
        <div className="question-text">{text}</div>
        <div className="question-children">{children}</div>
        <div className="button-row">
          <button
            className="question-button"
            onClick={() => {
              index !== 0 ? onBack() : history.push('/');
            }}
          >
            &lt; Back
          </button>

          {end ? (
            <button
              disabled={!canProgress}
              className="question-button next"
              onClick={() => {
                onSubmit();
                history.push('/');
              }}
            >
              Submit &gt;
            </button>
          ) : (
            <button
              disabled={!canProgress}
              className="question-button next"
              onClick={() => {
                onNext();
              }}
            >
              Next &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
