import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export const ContactsList = ({ contacts, onDeleteContact }) => {
    return <ul className={css.list}>{contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
            <p className={css.text}>{name} : {number}</p>
            <button className={css.button}type='button' onClick={() => onDeleteContact(id)}>Delete</button>
        </li>))}
    </ul>
}

ContactsList.propTypes = {
    onDeleteContact: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }))
}
