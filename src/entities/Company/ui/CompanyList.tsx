import {useEffect, useRef} from 'react';

import {
  addCompany,
  deleteSelectedCompanies,
  initializeVisibleCompanies,
  toggleSelectAll, toggleSelectCompany, updateCompany
} from "../model/companySlice";
import {Input} from "../../../shared/ui/Input/Input";
import {HeaderCell} from "../../../shared/ui/Table/HeaderCell";
import {RowCell} from "../../../shared/ui/Table/RowCell";
import {Button} from "../../../shared/ui/Button/Button";
import {UseInfiniteScroll} from "../../../shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector/useAppSelector";

const CompanyList: React.FC = () => {
  const dispatch = useAppDispatch();

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [loadMoreRef] = UseInfiniteScroll(triggerRef)

  const visibleCompanies = useAppSelector((state) => state.companies.visibleCompanies);

  useEffect(() => {
    dispatch(initializeVisibleCompanies());
  }, [dispatch]);

  const handleAddCompany = () => dispatch(addCompany());
  const handleDeleteSelected = () => dispatch(deleteSelectedCompanies());

  const handleCheckboxChange = (id: number) => {
    dispatch(toggleSelectCompany(id));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const {name, value} = e.target
    dispatch(updateCompany({id, [name]: value}));
  };
  return (
    <div>
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <Input
          type="checkbox"
          onChange={e => dispatch(toggleSelectAll(e.target.checked))}
        />
        <span>Выделить всё</span>
        <Button onClick={handleAddCompany}>Добавить компанию</Button>
        <Button onClick={handleDeleteSelected}>Удалить выбранные</Button>
      </div>
      <div style={{maxHeight: '800px', overflowY: 'auto'}}>
        <table>
          <thead>
          <tr>
            <HeaderCell>Выбрать компанию</HeaderCell>
            <HeaderCell>Название компании</HeaderCell>
            <HeaderCell>Адрес</HeaderCell>
          </tr>
          </thead>
          <tbody>
          {visibleCompanies.map(company => (
            <tr key={company.id} style={{backgroundColor: company.selected ? '#f0f8ff' : 'white'}}>
              <RowCell>
                <Input
                  type="checkbox"
                  name="selected"
                  checked={company.selected}
                  onChange={() => handleCheckboxChange(company.id)}/>
              </RowCell>
              <RowCell>
                <Input
                  type="text"
                  name='name'
                  value={company.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, company.id)}/>
              </RowCell>
              <RowCell>
                <Input
                  type="text"
                  name='address'
                  value={company.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, company.id)}/>
              </RowCell>
            </tr>
          ))}
          </tbody>
        </table>

        <div ref={loadMoreRef as React.RefObject<HTMLDivElement>} style={{height: '1px'}}/>
      </div>
    </div>
  );
};

export default CompanyList;
