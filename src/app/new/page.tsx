'use client';
import { addPlayer, createGame } from '@/api-client/client';
import { setClientId } from '@/game/clientId';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export default function NewGamePage() {
	const [name, setName] = useState('');
	const [isDirty, setIsDirty] = useState(false);
	const router = useRouter();

	const startGame = async () => {

		const code = await createGame();
		const clientId = await addPlayer(code, name);
		setClientId(clientId);
		router.push('/game?' + new URLSearchParams({ code }).toString());
	}

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		setIsDirty(true);
		if (name) {
			startGame();
		}
		return false;
	}

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setName(e.target.value);
		setIsDirty(true);
	}

	return (
		<form onSubmit={onSubmit} className={isDirty ? 'dirty' : ''}>
			<input
				type="text"
				required={true}
				placeholder='Enter your name'
				value={name}
				onChange={onChange}
			/>

			<button disabled={!name}>Start Game</button>
		</form>
	)
};
