import {useContext} from 'react';
import dataContext from '../../service/context';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = () => {
	const {users, searchVal, onChangeSearchVal, invites, onChoosePerson, loading, onSendInvites} = useContext(dataContext);

	const persons = users
		.filter(person => {
			const fullName = (person.first_name + person.last_name).toLowerCase(),
				  email = person.email.toLowerCase(),
				  search = searchVal.toLowerCase();

			return fullName.includes(search) || email.includes(search);
		})
		.map(person => {
			const {id, ...data} = person;
			return (
				<User 
					key={id} 
					{...data} 
					isInvited={invites.includes(id)}
					onChoosePerson={() => onChoosePerson(id)} />
			)
	})

	return (
		<>
			<div className="search">
				<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
				</svg>
				<input value={searchVal} onChange={onChangeSearchVal} type="text" placeholder="Найти пользователя..." />
			</div>
			{loading ? (
				<div className="skeleton-list">
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<ul className="users-list">
					{persons}
				</ul>
			)}
			<button 
				className="send-invite-btn" 
				disabled={invites.length === 0}
				onClick={onSendInvites}>
					Отправить приглашение
			</button>
		</>
	);
};
