import { Component } from "react";
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {

    state = {
        name: '',
        number: ''
    }
    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        this.props.onSubmit(this.state.name, this.state.number);

        this.setState({ name: '' , number: '' });
    }
    render() {
        const { name, number } = this.state;
        return (
            <form className={css.form} onSubmit={this.handleSubmit}>
                <div className={css.form__wrapper}>
                    <label className={css.label}> Name
                        <input
                            className={css.input} 
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            value={name}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>
                <div className={css.form__wrapper}>
                    <label className={css.label}> Number
                        <input
                            className={css.input}
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            value={number}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>
                <button type='submit' className={css.button}>Add contact</button>
            </form>
        )
    }
}


export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};