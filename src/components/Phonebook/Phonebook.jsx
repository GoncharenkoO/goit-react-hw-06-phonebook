import { useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ContactsForm from './ContactsForm';
import ContactsList from './ContactsList';
import Filter from './Filter';
import { actions } from '../../redux/contacts/contacts-slice';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';
import { getFilteredContacts } from './getFilteredContacts';

import styles from './phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(getAllContacts, shallowEqual);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  const handleChange = useCallback(({ target }) => setFilter(target.value), []);

  const addContact = payload => {
    const action = actions.add(payload);
    dispatch(action);
  };

  const onDeleteContact = id => {
    dispatch(actions.remove(id));
  };

  const filteredContacts = getFilteredContacts(filter, contacts);

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Phonebook</h2>
      <ContactsForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      {contacts.length > 1 && (
        <Filter value={filter} handleChange={handleChange} />
      )}
      {contacts.length > 0 ? (
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <p>Your phonebook is empty. Please add contact.</p>
      )}
    </div>
  );
};

export default Phonebook;
