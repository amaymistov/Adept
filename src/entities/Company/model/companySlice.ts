import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Company {
  id: number;
  name: string;
  address: string;
  selected: boolean;
}

interface CompaniesState {
  companies: Company[];
  visibleCompanies: Company[];
}

const initialState: CompaniesState = {
  companies: Array.from({length: 500}, (_, i) => ({
    id: i,
    name: `Company ${i + 1}`,
    address: `Address ${i + 1}`,
    selected: false,
  })),
  visibleCompanies: []
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    initializeVisibleCompanies(state) {
      state.visibleCompanies = state.companies.slice(0, 20);
    },

    loadMoreCompanies(state) {
      const nextCompanies = state.companies.slice(
        state.visibleCompanies.length,
        state.visibleCompanies.length + 20
      );
      state.visibleCompanies = [...state.visibleCompanies, ...nextCompanies];
    },

    toggleSelectAll(state, action: PayloadAction<boolean>) {
      state.companies.forEach(company => (company.selected = action.payload));
      state.visibleCompanies.forEach(company => (company.selected = action.payload));
    },

    toggleSelectCompany(state, action: PayloadAction<number>) {
      const company = state.companies.find(c => c.id === action.payload);
      if (company) company.selected = !company.selected;

      const visibleCompany = state.visibleCompanies.find(c => c.id === action.payload);
      if (visibleCompany) visibleCompany.selected = company?.selected || false;
    },

    addCompany(state) {
      const newId = state.companies.length
        ? Math.max(...state.companies.map(c => c.id)) + 1
        : 1;

      const newCompany: Company = {
        id: newId,
        name: `New Company ${newId}`,
        address: `New Address ${newId}`,
        selected: false,
      };
      state.companies.push(newCompany);
      state.visibleCompanies.push(newCompany);
    },

    deleteSelectedCompanies(state) {
      state.companies = state.companies.filter(company => !company.selected);
      state.visibleCompanies = state.visibleCompanies.filter(company => !company.selected);
    },

    updateCompany(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      const companyIndex = state.companies.findIndex(c => +c.id === action.payload.id);
      const visibleCompanyIndex = state.visibleCompanies.findIndex(c => c.id === action.payload.id);

      const updateCompany = {...state.companies[companyIndex], ...action.payload}
      const visibleCompany = {...state.visibleCompanies[visibleCompanyIndex], ...action.payload}

      if (companyIndex !== -1) state.companies[companyIndex] = updateCompany;
      if (visibleCompanyIndex !== -1) state.visibleCompanies[visibleCompanyIndex] = visibleCompany;
    },
  },
});

export const {
  initializeVisibleCompanies,
  loadMoreCompanies,
  toggleSelectAll,
  toggleSelectCompany,
  addCompany,
  deleteSelectedCompanies,
  updateCompany
} = companiesSlice.actions;
export default companiesSlice.reducer;