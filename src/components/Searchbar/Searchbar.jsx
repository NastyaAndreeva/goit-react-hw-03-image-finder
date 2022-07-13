import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import {
  SearchBarInput,
  SearchBarForm,
  SearchBarButton,
  SearchBarheader,
  SearchBarButtonLabel,
} from './SearchBarElements';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (values.searchQuery.trim() === '') {
      return toast.error('Please, enter search query.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
            <ImSearch />
          </SearchBarButton>
        </SearchBarForm>
      </Formik>
    </SearchBarheader>
  );
};
