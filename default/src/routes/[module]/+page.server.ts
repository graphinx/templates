import { data } from '$lib/data.generated.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { schema, modules, index } = data;

	if (params.module !== 'index' && !modules.some((module) => module.name === params.module))
		error(404, { message: `Module ${params.module} inexistant` });
	try {
		return {
			schema,
			modules:
				params.module === 'index'
					? [index]
					: // biome-ignore lint/style/noNonNullAssertion: we are checking if the module exists before
						[modules.find((module) => module.name === params.module)!]
		};
	} catch (err) {
		error(404, { message: `Module ${params.module} inexistant` });
	}
}
