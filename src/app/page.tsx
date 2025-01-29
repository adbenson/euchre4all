import { getData } from "@/db/db";

export default async function Home() {
	const data = await getData();
	return (
		<div>
			Euchre 4 All!

			<pre>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	);
}
