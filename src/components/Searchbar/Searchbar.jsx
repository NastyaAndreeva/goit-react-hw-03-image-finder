import { Formik } from 'formik';
import {
  SearchBarInput,
  SearchBarForm,
  SearchBarButton,
  SearchBarheader,
  SearchBarButtonLabel,
} from './SearchBarElements';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <SearchBarheader className="searchbar">
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        <SearchBarForm>
          <SearchBarInput type="text" name="searchQuery" />
          <SearchBarButton type="submit">
            <SearchBarButtonLabel />
          </SearchBarButton>
        </SearchBarForm>
      </Formik>
    </SearchBarheader>
  );
};
