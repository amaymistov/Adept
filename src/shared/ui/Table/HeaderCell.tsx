interface HeaderCellProps {
  children?: React.ReactNode;
}

export const HeaderCell = (props: HeaderCellProps) => {
  const {children} = props;
  return <th>{children}</th>;
};
