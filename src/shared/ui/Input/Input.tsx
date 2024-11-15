interface InputProps {
  className?: string,
  value?: string | number,
  type?: 'text' | 'number' | 'checkbox' | 'radio',
  checked?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name?: string
}

export const Input = (props: InputProps) => {
  const {className, name, value, checked, type, ...otherProps} = props;
  return <input className={className} name={name} checked={checked} value={value} type={type} {...otherProps} />;
};
