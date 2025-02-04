'use client';
import { addPlayer, createGame } from '@/api-client/client';
import { setPlayerToken } from '@/api-client/playerToken';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, ReactNode, useState } from 'react';

export default function NewGamePage(): ReactNode {
	const [name, setName] = useState('');
	const [isDirty, setIsDirty] = useState(false);
	const router = useRouter();

	const startGame = async () => {
		const code = await createGame();
		const token = await addPlayer(code, name);
		setPlayerToken(token);
		router.push(`/game/${code}`);
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
