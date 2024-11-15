interface ButtonProps {
  children?: React.ReactNode,
  onClick?: () => void,
}

export const Button = (props: ButtonProps) => {
  const {children, onClick, ...otherProps} = props;
  return <button
    style={{
      height: '2.5rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      background: '#e5e8e5',
      color: '#000',
      border: 'none'
    }}
    onClick={onClick}
    {...otherProps}>{children}
  </button>;
};
