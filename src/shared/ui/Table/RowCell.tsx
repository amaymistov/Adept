interface RowCellProps {
  children?: React.ReactNode;
}

export const RowCell = (props: RowCellProps) => {
  const {children} = props;
  return <td>{children}</td>;
};
