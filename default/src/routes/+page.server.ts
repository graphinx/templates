import { data } from '$lib/data.generated';
import { markdownToHtml } from '$lib/markdown';

export async function load() {
	return {
		...data,
		descriptionHtml: await markdownToHtml(data.config.description, data.items, {
			downlevelHeadings: false
		})
	};
}
