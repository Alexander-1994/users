import {useContext} from 'react';
import dataContext from '../service/context';

export const Success = () => {
	const {invites} = useContext(dataContext);

	return (
		<div class="success-block">
		<img src="/assets/success.svg" alt="Success" />
		<h3>Успешно!</h3>
		<p>Всем {invites.length} пользователям отправлено приглашение.</p>
		<a href="/">
			<button className="send-invite-btn">Назад</button>
		</a>
		</div>
	);
};
