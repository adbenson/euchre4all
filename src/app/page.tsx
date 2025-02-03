import Link from "next/link";

export default function HomePage() {
	return (
		<div>
			Euchre 4 All!

			<Link href="/new">New Game</Link>
			<Link href="/join">Join Game</Link>
		</div>
	);
}
