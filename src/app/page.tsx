import Link from "next/link";

export default function HomePage() {
	return (
		<div>
			<h1>Euchre 4 All!</h1>

			<Link href="/new" className="m-10">New Game</Link>
			<Link href="/join">Join Game</Link>
		</div>
	);
}
