const CodeColumn = () => {
  let randDigits = [].concat(
    ...Array.from({ length: 20 }, () =>
      ('' + Math.floor(Math.random() * 10000000))
        .split('')
        .map((digit) => (parseInt(digit) > 5 ? 1 : 0))
    )
  );
  return <div className="code-column">{randDigits}</div>;
};

export default CodeColumn;
