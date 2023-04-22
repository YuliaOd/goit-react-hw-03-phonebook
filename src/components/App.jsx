import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import css from "./App.module.css";

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    } 
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }



  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }

    const addedContacts = this.getAddedContacts(name);
    
    (addedContacts) ? alert(`${name} is already in contacts`) :
    this.setState(({contacts}) => ({
      contacts: [contact, ...contacts]
    }))
  }

  getAddedContacts = (name) => {
    const { contacts } = this.state;
    return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
  }

  changeFilter = (event) => {
    this.setState({filter: event.currentTarget.value})
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }
  
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }
  
  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onFilterChange={this.changeFilter}/>
        <ContactsList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
  )
  }
};