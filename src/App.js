import {useState, useEffect, } from 'react';
import dataContext from './service/context';
import Service from './service/Service';
import { Users } from './components/Users';
import { Success } from './components/Success';
import './index.scss';

const {Provider} = dataContext;

function App() {
	const [users, setUsers] = useState([]),
		  [searchVal, setSearchVal] = useState(''),
		  [invites, setInvited] = useState([]),
		  [loading, setLoading] = useState(true),
		  [success, setSuccess] = useState(false);

	const {getPersons} = Service();

	useEffect(() => {
		onRequest();
	}, []);

	const onRequest = () => {
		setLoading(true);

		getPersons()
			.then(onListLoaded)
			.catch(error => new Error(error))
			.finally(() => setLoading(false))
	};

	const onListLoaded = value => setUsers(value);		

	const onChangeSearchVal = e => setSearchVal(e.target.value);

	const onChoosePerson = id => {
		if (invites.includes(id)) {
			setInvited(prev => prev.filter(elem => elem !== id))
		} else {
			setInvited(prev => [...prev, id])
		}
	}

	const onSendInvites = () => setSuccess(true);

	const states = {
		users, 
		searchVal,
		onChangeSearchVal,
		invites,
		onChoosePerson,
		loading,
		onSendInvites
	};

	let content = success ? <Success /> : <Users />;

	return (
		<Provider value={states}>
			<div className="App">
				{content}
			</div>
		</Provider>
	);
}	

export default App;
