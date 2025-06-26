function IconWithText({ children, text, ...props }) {
  return (
    <div className="bg-white shadow me-3 icon-with-text" {...props}>
      {children}
      <p className="mb-0">{text}</p>
    </div>
  );
}

export default IconWithText;
